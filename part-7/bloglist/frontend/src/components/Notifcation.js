import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.noti)
  const style = {
    border: 'solid',
    padding: 10,
    color: 'grey',
    borderWidth: 1,
    visiblity: 'visible',
  }
  const hide = {
    visiblity: 'hidden',
  }

  if (notification === null) {
    return null
  }

  return (
    <div style={notification.noti !== null ? style : hide}>
      {notification.noti}
    </div>
  )
}

export default Notification
