import React, { useRef, useState } from 'react'
import Togglable from './Toggable'
export const BlogDetail = ({ blog, handleLike, deleteBlog, user }) => {
  const [open, setOpen] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogRef = useRef(null)
  const toggleExpanded = () => {
    blogRef.current.toggleVisibility()
    setOpen(!open)
  }
  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleExpanded} className='viewButton' id={blog.title}>
        {open ? 'hide' : 'view'}
      </button>
      <Togglable ref={blogRef} buttonLabel=''>
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
      </Togglable>
    </div>
  )
}
