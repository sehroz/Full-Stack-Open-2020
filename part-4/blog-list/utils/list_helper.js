const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, item) => {
    return sum + item['likes']
  }, 0)

  return likes
}
module.exports = {
  dummy,
  totalLikes,
}
