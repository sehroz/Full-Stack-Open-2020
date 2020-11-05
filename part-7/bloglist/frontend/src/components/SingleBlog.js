import React from 'react'

export const SingleBlog = ({ blog, user, handleLike, deleteBlog }) => {
  if (!blog) {
    return null
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
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}{' '}
      </ul>
    </div>
  )
}

export default SingleBlog
