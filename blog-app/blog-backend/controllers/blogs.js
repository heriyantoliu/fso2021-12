const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  if (!request.user) {
    return
  }

  const blog = new Blog({ ...request.body, user: user.id })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await User.findByIdAndUpdate(user.id, user)

  response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    console.log('DELETE')
    console.log('ID', request.user.id)

    if (blog.user.toString() !== request.user.id) {
      return response
        .status(401)
        .json({ error: 'cannot delete another user blog' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
)

module.exports = blogsRouter
