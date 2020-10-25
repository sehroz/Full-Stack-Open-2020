import React, { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

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
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input value={newBlog.title} name='title' onChange={handleBlogChange} />
      </div>
      <div>
        author:
        <input
          value={newBlog.author}
          name='author'
          onChange={handleBlogChange}
        />
      </div>
      <div>
        url:
        <input value={newBlog.url} name='url' onChange={handleBlogChange} />
      </div>

      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm
