import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

Togglable.displayName = 'Togglable'

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
        {props.buttonLabel.length > 0 ? (
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        ) : null}
      </div>
      <div style={showWhenVisible}>{props.children}</div>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
