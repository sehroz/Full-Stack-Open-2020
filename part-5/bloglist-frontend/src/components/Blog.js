import React, { useRef, useState } from 'react'

import Togglable from './Toggable'

const Blog = ({ blog, handleLike, deleteBlog }) => {
  const [open, setOpen] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const blogDetailRef = useRef()
  const toggleExpanded = () => {
    blogDetailRef.current.toggleVisibility()
    setOpen(!open)
  }

  return (
    <div style={blogStyle}>
      <div>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleExpanded}>{open ? 'hide' : 'view'}</button>
          <Togglable ref={blogDetailRef}>
            <div> {blog.url} </div>
            <div>
              {blog.likes}
              <button onClick={() => handleLike(blog.id)}> like</button>
              {blog.user.username}
              <button onClick={() => deleteBlog(blog.id)}>remove</button>
            </div>
          </Togglable>
        </div>
      </div>
    </div>
  )
}

export default Blog
