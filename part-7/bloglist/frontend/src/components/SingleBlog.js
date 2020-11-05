import React from 'react'

export const SingleBlog = ({ blog, user, handleLike, deleteBlog }) => {
  if (!blog) {
    return null
  }
  return (
    <div>
      <div> {blog.url} </div>
      <div className='likes'>
        {blog.likes}
        <button id={'like' + blog.title} onClick={() => handleLike(blog.id)}>
          like
        </button>

        {blog.user.username === user.username ? (
          <button id='deleteBlogButton' onClick={() => deleteBlog(blog.id)}>
            remove
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default SingleBlog
