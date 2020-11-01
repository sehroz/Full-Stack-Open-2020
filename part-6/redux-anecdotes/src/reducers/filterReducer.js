export const filter = (filterWord) => {
  return {
    type: 'FILTER_ANEC',
    filter: filterWord,
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_ANEC':
      return action.filter

    default:
      return state
  }
}

export default filterReducer
