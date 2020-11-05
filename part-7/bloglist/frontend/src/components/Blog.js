import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { BlogDetail } from './BlogDetail'

const Blog = (props) => {
  return (
    <>
      {props.blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <BlogDetail blog={blog} />
          </Link>
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

const mapDispatchToProps = {}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog
