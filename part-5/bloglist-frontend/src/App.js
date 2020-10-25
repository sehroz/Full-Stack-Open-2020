import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Msg from './components/Message'

const App = () => {
  const [createBlogVisible, setCreatBlogVisible] = useState(false)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((err) => {
        setMsg({ msg: `Did not get people list: ${err}`, type: 'success' })
        setTimeout(() => setMsg(null), 5000)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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

  const handleBlogChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }

    const returnedBlog = await blogService.create(blogObject)

    setBlogs(blogs.concat(returnedBlog))
    setMsg({
      msg: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      type: 'success',
    })
    setTimeout(() => setMsg(null), 5000)
    setNewBlog({ title: '', author: '', url: '' })
  }

  const blogForm = () => {
    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

    return (
      <>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreatBlogVisible(true)}>new Blog</button>
        </div>
        <div style={showWhenVisible}>
          <form onSubmit={addBlog}>
            <h2>create new</h2>
            <div>
              title:
              <input
                value={newBlog.title}
                name='title'
                onChange={handleBlogChange}
              />
            </div>
            <div>
              author:
              <input
                value={newBlog.author}
                name='author'
                onChange={handleBlogChange}
              />
            </div>
            <div>
              url:
              <input
                value={newBlog.url}
                name='url'
                onChange={handleBlogChange}
              />
            </div>

            <button type='submit'>create</button>
          </form>
          <button onClick={() => setCreatBlogVisible(false)}>cancel</button>
        </div>{' '}
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
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      ) : (
        <>{loginForm()}</>
      )}
    </div>
  )
}

export default App
