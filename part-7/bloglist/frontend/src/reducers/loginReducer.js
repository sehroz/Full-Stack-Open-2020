/* eslint-disable indent */
import loginService from '../services/login'
import blogService from '../services/blogs'

export const login = (users) => {
  return async (dispatch) => {
    const userData = await loginService.login(users)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userData))
    blogService.setToken(userData.token)
    dispatch({
      type: 'LOGIN',
      userData,
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
      data: null,
    })
  }
}

export const checkUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (!loggedUserJSON) {
      dispatch({
        type: 'CHECK_USER',
        data: null,
      })
    }
    const user = JSON.parse(loggedUserJSON)
    dispatch({
      type: 'CHECK_USER',
      data: user,
    })
  }
}

const loginReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.userData
    case 'LOGOUT':
      return action.data
    case 'CHECK_USER':
      if (action.data !== null) {
        blogService.setToken(action.data.token)
      }
      return action.data
    default:
      return state
  }
}

export default loginReducer
