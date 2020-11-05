import React, { useState } from 'react'

const SingleBlog = ({ blog, user, handleLike, deleteBlog, handleComment }) => {
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const addCom = (e) => {
    e.preventDefault()
    handleComment(blog.id, comment)
  }
  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}> {blog.url} </a>
      <div className='likes'>
        {blog.likes} likes
        <button id={'like' + blog.title} onClick={() => handleLike(blog.id)}>
          like
        </button>
        {blog.user.username === user.username ? (
          <button id='deleteBlogButton' onClick={() => deleteBlog(blog.id)}>
            remove
          </button>
        ) : null}
      </div>
      <p>added by {blog.author}</p>
      <h2>comments</h2>
      <form id='form' onSubmit={addCom}>
        <h2>create new</h2>
        <div>
          comment:
          <input
            id='title'
            value={comment}
            name='comment'
            onChange={handleChange}
          />
          <button id='submitCommentButton' type='submit'>
            add comment
          </button>
        </div>
      </form>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}{' '}
      </ul>
    </div>
  )
}

export default SingleBlog
