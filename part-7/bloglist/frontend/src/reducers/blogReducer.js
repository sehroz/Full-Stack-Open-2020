/* eslint-disable no-case-declarations */
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

export const addLike = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_LIKE',
      data: id,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteIt(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
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
    case 'DELETE_BLOG':
      const deleteId = action.data
      return state.filter((blog) => blog.id !== deleteId)
    case 'ADD_LIKE':
      const id = action.data
      const likedBlog = state.find((blog) => blog.id === id)
      const updatedBlog = { ...likedBlog, likes: likedBlog.likes + 1 }
      blogService.like(updatedBlog)
      return state
        .map((blog) => (blog.id !== id ? blog : updatedBlog))
        .sort((a, b) => b.likes - a.likes)
    default:
      return state
  }
}

export default blogReducer
