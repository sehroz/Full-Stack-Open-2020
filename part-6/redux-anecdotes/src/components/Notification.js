import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.noti)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: '',
  }
  const hide = {
    display: 'none',
  }
  return <div style={notification !== null ? style : hide}>{notification}</div>
}

export default Notification
