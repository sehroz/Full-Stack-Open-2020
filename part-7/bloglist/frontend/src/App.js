import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkUser, logout } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'

import { connect } from 'react-redux'
import { LoginForm, Notifcation } from './components/index.js'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.clear()
    props.logout()
  }

  if (props.user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notifcation />
        <LoginForm />
      </div>
    )
  }

  return (
    <>
      <h2>blogs</h2>
      <Notifcation />
      <h3>
        {props.user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </h3>
      <Switch>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  logout,
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedBlogs
