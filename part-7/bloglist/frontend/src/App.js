import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { addNoti } from './reducers/notiReducer'
import { addLike } from './reducers/blogReducer'
import { deleteBlog } from './reducers/blogReducer'
import { addNewBlog } from './reducers/blogReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { connect } from 'react-redux'
import Notifcation from './components/Notifcation'
import { useDispatch } from 'react-redux'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import LoginForm from './components/LoginForm'

const App = (props) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async (login) => {
    try {
      const user = await loginService.login({
        username: login.username,
        password: login.password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      props.addNoti('Logged In!', 5)
    } catch (error) {
      props.addNoti(`${error.response.data.error}`, 5)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    props.addNoti('Logged Out!', 5)
  }

  const addBlog = async (blogObj) => {
    const returnedBlog = await props.addNewBlog(blogObj)

    props.addNoti(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      5
    )
  }

  const handleLike = async (id) => {
    const findBlog = props.blogs.find((blog) => blog.id === id)
    props.addLike(id)
    props.addNoti(`Liked ${findBlog.title}`, 5)
  }

  const deleteBlog = async (id) => {
    const blog = props.blogs.find((blog) => blog.id === id)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await props.deleteBlog(id)

      props.addNoti(`Deleted ${blog.title} by ${blog.author}`, 5)
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
          {props.blogs.map((blog) => (
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
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  addNewBlog,
  addNoti,
  addLike,
  deleteBlog,
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedBlogs
