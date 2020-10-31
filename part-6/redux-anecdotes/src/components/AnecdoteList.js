import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNoti, removeNoti } from '../reducers/notiReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecs)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    const voteFor = anecdotes.find((anec) => anec.id === id).content
    dispatch(addNoti(`you voted ${voteFor}`))
    setTimeout(() => dispatch(removeNoti()), 5000)
  }

  const filteredList = anecdotes
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ))

  return <div>{filteredList}</div>
}

export default AnecdoteList
