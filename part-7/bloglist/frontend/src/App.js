import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkUser, logout } from './reducers/loginReducer'
import {
  initializeBlogs,
  addLike,
  deleteBlog,
  addComment,
} from './reducers/blogReducer'
import './App.css'
import { addNoti } from './reducers/notiReducer'
import SingleUser from './components/SingleUser'
import { connect } from 'react-redux'
import { LoginForm, Notifcation, SingleBlog } from './components/index.js'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'

import { getUsers } from './reducers/userReducer'
import Nav from './components/Nav'

const App = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogmatch = useRouteMatch('/blogs/:id')
  const usermatch = useRouteMatch('/users/:id')
  useEffect(() => {
    dispatch(checkUser())
    dispatch(initializeBlogs())
    dispatch(getUsers())
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.clear()
    props.logout()
    history.push('/')
  }
  const handleLike = async (id) => {
    const findBlog = props.blogs.find((blog) => blog.id === id)
    props.addLike(id)
    props.addNoti(`Liked ${findBlog.title}`, 5)
  }

  const handleComment = async (id, comment) => {
    props.addComment(id, comment)
    props.addNoti('Added Comment!', 5)
  }

  const deleteBlog = async (id) => {
    console.log(id)
    console.log(props)
    const blog = props.blogs.find((blog) => blog.id === id)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await props.deleteBlog(id)
      props.addNoti(`Deleted ${blog.title} by ${blog.author}`, 5)
    }
    history.push('/home')
  }

  const blog = blogmatch
    ? props.blogs.find((blog) => blog.id === blogmatch.params.id)
    : null

  const singleUser = usermatch
    ? props.users.find((user) => user.id === usermatch.params.id)
    : null
  return (
    <>
      {props.user !== null && props.user.username ? (
        <>
          <Nav handleLogout={handleLogout} user={props.user} />
          <Notifcation />
        </>
      ) : null}

      <Switch>
        <Route path='/blogs/:id'>
          <SingleBlog
            handleLike={handleLike}
            deleteBlog={deleteBlog}
            handleComment={handleComment}
            blog={blog}
            user={props.user}
          />
        </Route>
        <Route path='/users/:id'>
          <SingleUser singleUser={singleUser} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/home'>
          <Home />
        </Route>
        <Route path='/'>
          <LoginForm />
        </Route>
      </Switch>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs,
    users: state.users,
  }
}

const mapDispatchToProps = {
  logout,
  addLike,
  addNoti,
  deleteBlog,
  addComment,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
