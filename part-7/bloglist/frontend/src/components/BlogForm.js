import React, { useState, useRef } from 'react'
import { addNewBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { addNoti } from '../reducers/notiReducer'
import Togglable from '../components/Toggable'
const BlogForm = (props) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleBlogChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
  }

  const addBlog = async (event) => {
    event.preventDefault()

    setNewBlog({ title: '', author: '', url: '' })
    const returnedBlog = await props.addNewBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })

    props.addNoti(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      5
    )
  }

  const blogDetailRef = useRef()
  const toggleExpanded = () => {
    blogDetailRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='new Blog' buttonId='makeBlog' ref={blogDetailRef}>
      <form id='form' onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title:
          <input
            id='title'
            value={newBlog.title}
            name='title'
            onChange={handleBlogChange}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            value={newBlog.author}
            name='author'
            onChange={handleBlogChange}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            value={newBlog.url}
            name='url'
            onChange={handleBlogChange}
          />
        </div>

        <button id='submitBlogButton' type='submit'>
          create
        </button>
      </form>
      <button onClick={toggleExpanded}>cancel</button>
    </Togglable>
  )
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = {
  addNewBlog,
  addNoti,
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(BlogForm)

export default ConnectedBlogs
