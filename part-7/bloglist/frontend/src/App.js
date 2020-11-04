import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { login } from './reducers/loginReducer'
import { logout } from './reducers/loginReducer'
import { addNoti } from './reducers/notiReducer'
import { addLike } from './reducers/blogReducer'
import { deleteBlog } from './reducers/blogReducer'
import { addNewBlog } from './reducers/blogReducer'
import { checkUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { connect } from 'react-redux'
import Notifcation from './components/Notifcation'
import { useDispatch } from 'react-redux'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import LoginForm from './components/LoginForm'

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async (login) => {
    try {
      await props.login({
        username: login.username,
        password: login.password,
      })

      props.addNoti('Logged In!', 5)
    } catch (error) {
      props.addNoti(`${error.response.data.error}`, 5)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    props.logout()
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
  console.log(props.user)
  return (
    <div>
      <h2>blogs</h2>
      <Notifcation />
      {props.user && props.user.username ? (
        <>
          <h3>
            {props.user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </h3>

          {blogForm()}
          {props.blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              deleteBlog={deleteBlog}
              user={props.user.username}
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
    user: state.user,
  }
}

const mapDispatchToProps = {
  addNewBlog,
  addNoti,
  addLike,
  login,
  logout,
  deleteBlog,
  checkUser,
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedBlogs
