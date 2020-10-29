import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote, addAnec } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  const createAnec = (e) => {
    e.preventDefault()
    const anecWords = e.target.anec.value
    e.target.anec.value = ''
    dispatch(addAnec(anecWords))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={createAnec}>
        <div>
          <input name='anec' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
