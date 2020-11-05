import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import BlogForm from './BlogForm'

test('form calls the event handler it received as props with the right details when a new blog is created.', () => {
  const addBlog = jest.fn()

  const component = render(<BlogForm createBlog={addBlog} />)

  const form = component.container.querySelector('#form')
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')

  fireEvent.change(author, {
    target: { value: 'Sehrozz' },
  })
  fireEvent.change(title, {
    target: { value: 'okokok' },
  })

  fireEvent.change(url, {
    target: { value: 'sehroz.com' },
  })

  fireEvent.submit(form)

  console.log(addBlog.mock.calls[0][0])

  const returnedTITLE = addBlog.mock.calls[0][0]['title']
  const returnedURL = addBlog.mock.calls[0][0]['url']

  expect(returnedTITLE).toEqual('okokok')
  expect(returnedURL).toEqual('sehroz.com')
})
