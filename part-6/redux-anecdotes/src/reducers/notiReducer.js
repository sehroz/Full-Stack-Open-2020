const notiReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTI':
      return action.noti
    default:
      return state
  }
}

export const addNoti = (noti) => {
  return {
    type: 'SET_NOTI',
    noti,
  }
}

export const removeNoti = () => {
  return {
    type: 'SET_NOTI',
    noti: null,
  }
}
export default notiReducer
