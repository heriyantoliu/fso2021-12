const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Title A',
    author: 'Author A',
    url: 'www.a.com',
    likes: 1,
  },
  {
    title: 'Title B',
    author: 'Author B',
    url: 'www.b.com',
    likes: 5,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
