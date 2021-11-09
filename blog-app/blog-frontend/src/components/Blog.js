import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleAddLikes = () => {
    addLikes({
      id: blog.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    })
  }

  const handleRemove = (blog) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      removeBlog(blog.id)
    }
  }

  return (
    <div id="list-blogs" style={blogStyle}>
      <span id="span-blog">
        {blog.title} {blog.author}
      </span>
      <Togglable buttonLabel="view">
        <div>{blog.url}</div>
        <div id="likes-div">
          likes {blog.likes}{' '}
          <button id="likes" className="btnLike" onClick={handleAddLikes}>
            likes
          </button>
        </div>
        <div>{blog.author}</div>
        <button id="remove-blog-button" onClick={() => handleRemove(blog)}>
          remove
        </button>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  // removeBlog: PropTypes.func.isRequired,
}

export default Blog
