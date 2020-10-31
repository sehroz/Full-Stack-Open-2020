import anecService from '../services/anecs'

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id },
  }
}

export const addAnec = (anecWords) => {
  return async (dispatch) => {
    const newAnec = await anecService.createAnec(anecWords)
    dispatch({
      type: 'ADD_ANEC',
      data: newAnec,
    })
  }
}

export const initializeAnecs = () => {
  return async (dispatch) => {
    const anecs = await anecService.getAll()
    dispatch({
      type: 'INIT_ANECS',
      data: anecs,
    })
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
