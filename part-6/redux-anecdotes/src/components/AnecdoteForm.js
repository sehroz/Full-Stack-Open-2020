import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnec } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnec = (e) => {
    e.preventDefault()
    const anecWords = e.target.anec.value
    e.target.anec.value = ''
    dispatch(addAnec(anecWords))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnec}>
        <div>
          <input name='anec' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}
export default AnecdoteForm
