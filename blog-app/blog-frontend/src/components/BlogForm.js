import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    newBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          Title{' '}
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author{' '}
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL{' '}
          <input
            id="url"
            type="text"
            value={url}
            name="title"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-blog-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  newBlog: PropTypes.func.isRequired,
}

export default BlogForm
