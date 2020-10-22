const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0
  }

  if (!blog.title || !blog.url) {
    return response.status(400).end()
  } else {
    const result = await blog.save()
    return response.status(201).json(result)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)

  res.status(204).end()
})

module.exports = blogsRouter
