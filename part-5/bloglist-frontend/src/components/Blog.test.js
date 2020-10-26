import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('checks that the component displaying a blog renders the blogs title and author, but does not render its url or number of likes by default', () => {
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

  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.likes)
  expect(div).not.toHaveTextContent(blog.url)
})

test('hecks that the blogs url and number of likes are shown when the button controlling the shown details has been clicked', () => {
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

  const button = component.container.querySelector('.viewButton')

  const details = component.container.querySelector('.togglableContent')
  expect(details).toHaveStyle('display: none')

  fireEvent.click(button)

  expect(details).toHaveStyle('display: block')
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
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
