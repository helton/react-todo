import React from 'react'
import PropTypes from 'prop-types'
import { partial } from '../../lib/utils'

export const TodoItem = props => {
  const handleToggle = partial(props.handleToggle, props.id)
  const handleRemove = partial(props.handleRemove, props.id)
  return (
    <li>
      <span className="delete-item">
        <button onClick={handleRemove}>X</button>
      </span>
      <input 
        type="checkbox"
        checked={props.isCompleted}
        onChange={handleToggle}/>
      {props.name}
    </li>
  )
}

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool,
  name: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}