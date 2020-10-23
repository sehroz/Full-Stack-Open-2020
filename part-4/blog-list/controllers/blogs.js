require('express-async-errors')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request)
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
    user: user._id,
  })

  if (!blog.title || !blog.url) {
    return response.status(400).end()
  } else {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    return response.status(201).json(result)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)

  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const { author, title, url, likes } = req.body

  const request = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      author,
      title,
      url,
      likes,
    },
    { new: true }
  )

  res.json(request)
})

module.exports = blogsRouter
