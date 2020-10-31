const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id },
  }
}

export const addAnec = (anecWords) => {
  const newAnec = asObject(anecWords)
  return {
    type: 'ADD_ANEC',
    data: newAnec,
  }
}

export const initializeAnecs = (anecs) => {
  return {
    type: 'INIT_ANECS',
    data: anecs,
  }
}

const anecReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'ADD_ANEC':
      return state.concat(action.data)
    case 'INIT_ANECS':
      return action.data
    case 'ADD_VOTE':
      const id = action.data.id
      const anecToVote = state.find((anec) => anec.id === id)
      const votedAnec = {
        ...anecToVote,
        votes: anecToVote.votes + 1,
      }
      return state
        .map((anec) => (anec.id !== id ? anec : votedAnec))
        .sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

export default anecReducer
