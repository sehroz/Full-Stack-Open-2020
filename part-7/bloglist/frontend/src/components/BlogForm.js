import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog, toggleExpanded }) => {
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
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })

    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <>
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
    </>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
