/* eslint-disable indent */
import blogService from '../services/blogs'

export const addNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    })

    return newBlog
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export default blogReducer
