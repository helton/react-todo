import React from 'react'
import PropTypes from 'prop-types'
import { TodoItem } from './TodoItem'

export const TodoList = props => {
  return (
    <ul className="todo-list">
      {props.todos.map(todo => 
        <TodoItem 
          key={todo.id}
          {...todo}
          editing={props.editing}
          handleToggle={props.handleToggle}
          handleRemove={props.handleRemove}
          handleEdit={props.handleEdit}
          handleUpdate={props.handleUpdate}
          />)}
    </ul>
   )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  editing: PropTypes.number,
  handleToggle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired
}