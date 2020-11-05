import {
  getUsers,
  checkUser,
  initializeBlogs,
  addLike,
  deleteBlog,
  addComment,
} from './blogReducer'
import { logout } from './loginReducer'
import { addNoti } from './notiReducer'

export default {
  addComment,
  getUsers,
  checkUser,
  logout,
  addNoti,
  initializeBlogs,
  addLike,
  deleteBlog,
}
