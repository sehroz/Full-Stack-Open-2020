import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { logout } from '../reducers/loginReducer'
import { addNoti } from '../reducers/notiReducer'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleL = (e) => {
    e.preventDefault()
    handleLogin({ username, password })
  }

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

  return (
    <form onSubmit={handleL}>
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
}
const mapStateToProps = () => {
  return {}
}
const mapDispatchToProps = {
  login,
  logout,
  addNoti,
}

const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm
