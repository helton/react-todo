import React from 'react'
import PropTypes from 'prop-types'
import { partial } from '../../lib/utils'

export const TodoItem = props => {
  const handleToggle = partial(props.handleToggle, props.id)
  const handleRemove = partial(props.handleRemove, props.id)
  const classNames = [
    props.isCompleted ? 'completed' : '',
    props.editing && props.editing === props.id ? 'editing' : ''
  ].filter(className => className && className.length > 0).join(' ')

  return (
    <li className={classNames}>
      <div className="view">
        <input 
          className="toggle"
          type="checkbox"
          checked={props.isCompleted}
          onChange={handleToggle}/>
        <label
          onDoubleClick={() => props.handleEdit(props.id)}>
          {props.name}
        </label>
        <button
          className="destroy"
          onClick={handleRemove}/>
      </div>
      <input
        className="edit"
        type="text"
        defaultValue={props.name}
        onKeyDown={evt => {
          if (evt.key === 'Enter')
            props.handleUpdate(evt.target.value, props.id)
          else if (evt.keyCode === 27) {
            evt.target.value = props.name
            props.handleEdit(null)
          }
        }}
        onBlur={evt => props.handleUpdate(evt.target.value, props.id)}
        />
    </li>
  )
}

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool,
  name: PropTypes.string.isRequired,
  editing: PropTypes.number,
  handleToggle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired
}