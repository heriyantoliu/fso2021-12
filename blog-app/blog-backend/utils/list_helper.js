// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  blogs.forEach((blog) => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes
    }
  })
  const favoriteBlog = blogs.find((blog) => blog.likes === mostLikes)
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  let authorBlogs = []

  blogs.forEach((blog) => {
    const foundAuthor = authorBlogs.find(
      (author) => author.author === blog.author
    )
    if (foundAuthor) {
      const updatedAuthorBlogs = {
        author: foundAuthor.author,
        blogs: foundAuthor.blogs + 1,
      }
      authorBlogs = authorBlogs.map((author) =>
        author.author === blog.author ? updatedAuthorBlogs : author
      )
    } else {
      authorBlogs = authorBlogs.concat({
        author: blog.author,
        blogs: 1,
      })
    }
  })

  let mostBlogs = 0
  authorBlogs.forEach((author) => {
    if (author.blogs > mostBlogs) {
      mostBlogs = author.blogs
    }
  })

  return authorBlogs.find((author) => author.blogs === mostBlogs)
}

const mostLikes = (blogs) => {
  let authorLikes = []

  blogs.forEach((blog) => {
    const foundAuthor = authorLikes.find(
      (author) => author.author === blog.author
    )
    if (foundAuthor) {
      const updatedAuthorLikes = {
        author: foundAuthor.author,
        likes: foundAuthor.likes + blog.likes,
      }
      authorLikes = authorLikes.map((author) =>
        author.author === blog.author ? updatedAuthorLikes : author
      )
    } else {
      authorLikes = authorLikes.concat({
        author: blog.author,
        likes: blog.likes,
      })
    }
  })

  let mostLikes = 0
  authorLikes.forEach((author) => {
    if (author.likes > mostLikes) {
      mostLikes = author.likes
    }
  })

  return authorLikes.find((author) => author.likes === mostLikes)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
