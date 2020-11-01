import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNoti } from '../reducers/notiReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    props.addVote(id)
    props.addNoti(
      `you voted '${
        props.filteredList.find((anec) => anec.id === id).content
      }'`,
      10
    )
  }

  return (
    <div>
      {props.filteredList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filteredList: state.anecs.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    ),
  }
}

const mapDispatchToProps = {
  addVote,
  addNoti,
}

const ConnectedAnecs = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecs
