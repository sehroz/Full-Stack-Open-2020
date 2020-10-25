import React, { useRef, useState } from 'react'

import Togglable from './Toggable'

const Blog = ({ blog, username, handleLike }) => {
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
              {blog.likes}{' '}
              <button onClick={() => handleLike(blog)}> like</button>
            </div>
            <div> {username} </div>
          </Togglable>
        </div>
      </div>
    </div>
  )
}

export default Blog
