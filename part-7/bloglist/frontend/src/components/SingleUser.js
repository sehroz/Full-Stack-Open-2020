import React from 'react'

export const SingleBlog = ({ singleUser }) => {
  if (!singleUser) {
    return null
  }
  console.log(singleUser.blogs)
  return (
    <div>
      <ul>
        {singleUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleBlog
