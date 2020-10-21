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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
