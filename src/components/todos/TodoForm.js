import React from 'react'
import PropTypes from 'prop-types'

export const TodoForm = props => {
  return (
    <input
      className="new-todo"
      type="text" 
      onChange={props.handleInputChange}
      onKeyPress={evt => {
        if (evt.key === 'Enter'){
          props.handleSubmit()
        }
      }}
      value={props.currentTodo}
      placeholder="What needs to be done?"/>
  )
}

TodoForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  currentTodo: PropTypes.string.isRequired
}