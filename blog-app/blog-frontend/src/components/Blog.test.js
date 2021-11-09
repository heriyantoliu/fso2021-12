import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog Component', () => {
  const blog = {
    id: 1,
    title: 'Title 1',
    author: 'Author 1',
    url: 'abc',
    likes: 2,
    user: 3,
  }

  let component
  const likesHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} addLikes={likesHandler} />)
  })

  test('render Note', () => {
    expect(component.container).toHaveTextContent('Title 1 Author 1')

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('render after button clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div2 = component.container.querySelector('.togglableContent')
    expect(div2).not.toHaveStyle('display: none')
  })

  test('button likes clicked twice', () => {
    const viewButton = component.getByText('view')

    fireEvent.click(viewButton)

    const likesButton = component.container.querySelector('.btnLike')

    fireEvent.click(likesButton)
    fireEvent.click(likesButton)
    expect(likesHandler.mock.calls).toHaveLength(2)
  })
})
