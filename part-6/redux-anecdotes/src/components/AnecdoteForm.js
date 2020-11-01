import React from 'react'
import { connect } from 'react-redux'
import { addAnec } from '../reducers/anecdoteReducer'
import { addNoti } from '../reducers/notiReducer'

const AnecdoteForm = (props) => {
  const createAnec = async (e) => {
    e.preventDefault()
    const content = e.target.anec.value
    e.target.anec.value = ''
    props.addAnec(content)
    props.addNoti(`you created '${content}'`, 5)
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

export default connect(null, { addAnec, addNoti })(AnecdoteForm)
