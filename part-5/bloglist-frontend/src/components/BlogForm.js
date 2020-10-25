import React from 'react'
const BlogForm = ({ handleBlogChange, newBlog, addBlog }) => {
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
