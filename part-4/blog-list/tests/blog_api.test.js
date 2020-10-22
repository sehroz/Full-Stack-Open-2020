const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(blogs[0])
  await blogObject.save()
  blogObject = new Blog(blogs[1])
  await blogObject.save()
})

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

test('a valid blog can be added', async () => {
  const newBlog = {
    author: 'Sehroz',
    likes: 6,
    title: 'ok',
    url: 'www.sehroz.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map((blog) => blog.title)

  expect(response.body).toHaveLength(blogs.length + 1)
  expect(titles).toContain('ok')
})

test('likes values defaults to zero if missing', async () => {
  const newBlog = {
    author: 'Sehroz',
    title: 'ok',
    url: 'www.sehroz.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const likes = response.body.map((blog) => blog.likes)

  expect(likes).toContain(0)
})

afterAll(() => {
  mongoose.connection.close()
})
