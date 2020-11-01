const notiReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTI':
      return action.data
    case 'CLEAR_NOTI':
      return null
    default:
      return state
  }
}

let timing = 0

export const addNoti = (noti, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTI',
      data: {
        noti,
        time,
      },
    })

    clearTimeout(timing)

    timing = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTI',
      })
    }, time * 1000)
  }
}

export default notiReducer
