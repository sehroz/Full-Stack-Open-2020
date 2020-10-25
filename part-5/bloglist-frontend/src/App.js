import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Msg from './components/Message'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((err) => {
        setMsg({ msg: `Did not get people list: ${err}`, type: 'success' })
        setTimeout(() => setMsg(null), 5000)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setMsg({
        msg: `Logged In`,
        type: 'success',
      })
      setTimeout(() => setMsg(null), 5000)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMsg({ msg: error.response.data.error, type: 'fail' })
      setTimeout(() => setMsg(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setMsg({
      msg: `Logged Out`,
      type: 'success',
    })
    setTimeout(() => setMsg(null), 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const addBlog = async (blogObj) => {
    const returnedBlog = await blogService.create(blogObj)

    setBlogs(blogs.concat(returnedBlog))
    setMsg({
      msg: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      type: 'success',
    })
    setTimeout(() => setMsg(null), 5000)
  }

  const handleLike = async (oldBlog) => {
    const newBlog = {
      ...oldBlog,
      likes: oldBlog !== undefined ? oldBlog.likes + 1 : 0,
    }
    const id = oldBlog.id

    const returnedBlog = await blogService.like(newBlog, id)

    const updatedBlogs = blogs.map((blog) =>
      blog.id === returnedBlog.id ? returnedBlog : blog
    )

    setBlogs(updatedBlogs)
  }

  const blogForm = () => {
    return (
      <>
        <Togglable buttonLabel='new Blog' buttonLabelB='cancel'>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Msg msg={msg} />
      {user ? (
        <>
          <h3>
            {user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </h3>

          {blogForm()}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              username={user.username}
            />
          ))}
        </>
      ) : (
        <>{loginForm()}</>
      )}
    </div>
  )
}

export default App
