const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
require('express-async-errors')
const api = supertest(app)
const helper = require('./helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.blogs.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unique identifier property of the blog posts is named id,', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0]['id']).toBeDefined()
  })
})

describe('addition of a new note', () => {
  test('likes values defaults to zero if missing', async () => {
    const newBlog = {
      author: 'Sehroz',
      title: 'ok',
      url: 'www.sehroz.com',
    }

    await api.post('/api/blogs').send(newBlog)

    const response = await api.get('/api/blogs')

    const likes = response.body.map((blog) => blog.likes)

    expect(likes).toContain(0)
  })

  test('title and url properties send 400 bad request status if missing', async () => {
    const newBlog = {
      author: 'Sehroz',
      likes: 1,
      title: 'k',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      author: 'Sehroz',
      likes: 6,
      title: 'ok',
      url: 'www.sehroz.com',
    }

    await api.post('/api/blogs').send(newBlog)

    const response = await api.get('/api/blogs')

    const titles = response.body.map((blog) => blog.title)

    expect(response.body).toHaveLength(helper.blogs.length + 1)
    expect(titles).toContain('ok')
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'sehroz', passwordHash })

    await user.save()
  })

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map((u) => u.toJSON())
  }

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'newSehroz',
      name: 'sehroz',
      password: 'sehroz',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'sehroz',
      name: 'sehroz',
      password: 'sehroz',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
