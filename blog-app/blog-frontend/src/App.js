import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({ text: 'wrong username or password', className: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken('')
    setUser(null)
  }

  const handleNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const result = await blogService.create(newBlog)

    setMessage({
      text: `a new blog ${result.title} by ${result.author} added`,
      className: 'success',
    })
    setTimeout(() => {
      setMessage(null)
    }, 2000)

    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const handleAddLikes = async (updatedBlog) => {
    const newblog = await blogService.update(updatedBlog.id, updatedBlog)
    setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? newblog : blog)))
  }

  const handleRemove = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (exception) {
      setMessage({ text: exception.response.data.error, className: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username{' '}
        <input
          id="username"
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{' '}
        <input
          id="password"
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm newBlog={handleNewBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLikes={handleAddLikes}
            removeBlog={handleRemove}
          />
        ))}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      {user === null ? loginForm() : blogsList()}
    </div>
  )
}

export default App
