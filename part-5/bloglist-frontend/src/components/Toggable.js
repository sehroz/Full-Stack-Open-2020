import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        {props.buttonLabelB && (
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        )}
      </div>
      <div style={showWhenVisible}>
        {props.children}
        {props.buttonLabelB && (
          <button onClick={toggleVisibility}>{props.buttonLabelB}</button>
        )}
      </div>
    </>
  )
})

export default Togglable
