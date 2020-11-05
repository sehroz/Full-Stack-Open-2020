import React from 'react'
import { connect } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { addNoti } from '../reducers/notiReducer'
import { BlogDetail } from './BlogDetail'

const Blog = (props) => {
  const handleLike = async (id) => {
    const findBlog = props.blogs.find((blog) => blog.id === id)
    props.addLike(id)
    props.addNoti(`Liked ${findBlog.title}`, 5)
  }

  const deleteBlog = async (id) => {
    console.log(id)
    console.log(props)
    const blog = props.blogs.find((blog) => blog.id === id)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await props.deleteBlog(id)

      props.addNoti(`Deleted ${blog.title} by ${blog.author}`, 5)
    }
  }

  return (
    <>
      {props.blogs.map((blog) => (
        <div key={blog.id}>
          <BlogDetail
            handleLike={handleLike}
            deleteBlog={deleteBlog}
            user={props.user}
            blog={blog}
          />
        </div>
      ))}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
  }
}

const mapDispatchToProps = {
  addLike,
  addNoti,
  deleteBlog,
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog
