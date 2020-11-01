import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnec } from '../reducers/anecdoteReducer'
import { addNoti } from '../reducers/notiReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnec = async (e) => {
    e.preventDefault()
    const content = e.target.anec.value
    e.target.anec.value = ''
    dispatch(addAnec(content))
    dispatch(addNoti(`you created '${content}'`, 2))
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
