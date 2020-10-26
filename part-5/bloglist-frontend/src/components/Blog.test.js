import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'Sehrozy',
    title: 'ok',

    user: {
      username: 'sehrozs',
      id: '324234324324',
      name: 'sehrozv',
    },
  }

  const component = render(<Blog blog={blog} />)

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('Sehrozy')

  const button = component.container.querySelector('button')
  console.log(prettyDOM(button))
})

test('clicking the button calls event handler once', () => {
  const blog = {
    author: 'Sehrozy',
    title: 'ok',
    url: 'sehroz.com',
    likes: 200,
    user: {
      username: 'sehrozs',
      id: '324234324324',
      name: 'sehrozv',
    },
  }

  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} handleLike={mockHandler} />)

  const button = component.getByText('like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
