import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<Blog Form />', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm newBlog={createBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Title A' },
  })
  fireEvent.change(author, {
    target: { value: 'Author A' },
  })
  fireEvent.change(url, {
    target: { value: 'www.test.com' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Title A')
  expect(createBlog.mock.calls[0][0].author).toBe('Author A')
  expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')
})
