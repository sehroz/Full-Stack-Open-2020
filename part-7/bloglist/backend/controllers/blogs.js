require('express-async-errors')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: request.body.title,
    likes: request.body.likes === undefined ? 0 : request.body.likes,
    author: request.body.author,
    url: request.body.url,
    comments: request.body.comments,
  })

  if (!blog.title || !blog.url) {
    return response.status(400).end()
  } else {
    blog.user = user
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    return response.status(201).json(result)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(req.params.id)
  if (!blog || blog.user == undefined) {
    return res.status(404).end()
  }
  const usersBlog = blog.user.toString() === decodedToken.id
  if (usersBlog) {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } else {
    res
      .status(403)
      .json({ error: 'invalid user' })
      .end()
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = req.body
  blog.user = blog.user.id

  const request = await Blog.findByIdAndUpdate(req.params.id, blog).populate(
    'user'
  )

  res.json(request)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  blog.comments = blog.comments.concat(req.body.comment)
  await blog.save()

  res.json(blog)
})

module.exports = blogsRouter
