const notiReducer = (state = 'DEFAULT NOTI', action) => {
  switch (action.type) {
    case 'SET_NOTI':
      return action.filter
    default:
      return state
  }
}

export const notiChange = (noti) => {
  return {
    type: 'SET_NOTI',
    noti,
  }
}
export default notiReducer
