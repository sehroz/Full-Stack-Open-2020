var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, item) => {
    return sum + item['likes']
  }, 0)

  return likes
}

const favoriteBlog = (blog) => {
  const mostLiked = blog.sort((a, b) => b.likes - a.likes)[0]
  return mostLiked
}

const mostBlogs = (blog) => {
  const blogger = _(blog)
    .countBy('author')
    .entries()
    .maxBy(_.last)

  const mostBlogged = {
    author: blogger[0],
    blogs: blogger[1],
  }

  return mostBlogged
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
