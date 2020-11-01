import React from 'react'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (e) => {
    const filterWord = e.target.value
    props.filter(filterWord)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { filter })(Filter)
