import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { addNoti } from './reducers/notiReducer'
import { connect } from 'react-redux'
import Notifcation from './components/Notifcation'

import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'

const App = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

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
        props.addNoti('Did Not Get Blogs!', 5)
      })
  }, [props])

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

      props.addNoti('Logged In!', 5)

      setUsername('')
      setPassword('')
    } catch (error) {
      props.addNoti(`${error.response.data.error}`, 5)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    props.addNoti('Logged Out!', 5)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          id='username'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          id='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )

  const addBlog = async (blogObj) => {
    const returnedBlog = await blogService.create(blogObj)
    setBlogs(blogs.concat(returnedBlog))

    props.addNoti(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      5
    )
  }

  const handleLike = async (id) => {
    const findBlog = blogs.find((blog) => blog.id === id)

    const newBlog = {
      ...findBlog,
      likes: findBlog.likes + 1,
      user: findBlog.user.id,
    }

    await blogService.like(newBlog)

    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? { ...findBlog, likes: findBlog.likes + 1 } : blog
    )

    setBlogs(updatedBlogs)

    props.addNoti(`Liked ${findBlog.title}`, 5)
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await blogService.deleteIt(id)
      const updatedBlogs = blogs.filter((blog) => blog.id !== id)
      props.addNoti(`Deleted ${blog.title} by ${blog.author}`, 5)

      setBlogs(updatedBlogs)
    }
  }

  const blogDetailRef = useRef()
  const toggleExpanded = () => {
    blogDetailRef.current.toggleVisibility()
  }

  const blogForm = () => {
    return (
      <>
        <Togglable
          buttonLabel='new Blog'
          buttonId='makeBlog'
          ref={blogDetailRef}
        >
          <BlogForm createBlog={addBlog} toggleExpanded={toggleExpanded} />
        </Togglable>
      </>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notifcation />
      {user ? (
        <>
          <h3>
            {user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </h3>

          {blogForm()}
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                deleteBlog={deleteBlog}
                user={user.username}
              />
            ))}
        </>
      ) : (
        <>{loginForm()}</>
      )}
    </div>
  )
}

export default connect(null, { addNoti })(App)
