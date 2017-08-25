import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '../router'

export const TodoFilters = props => {
  const activeTodoCount = props.todos.filter(todo => !todo.isCompleted).length
  return (
    <div>
      <span className="todo-count">
        <strong>{activeTodoCount}</strong> item{ activeTodoCount > 1 ? 's' : ''} left
      </span>
      <ul className="filters">
        <li>
          <Link to="/">All</Link>
        </li>
        <li>
          <Link to="/active">Active</Link>
        </li>
        <li>
          <Link to="/completed">Completed</Link>
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={props.handleClearCompletedTodos}>
        Clear completed
      </button>
    </div>
  )
}

TodoFilters.propTypes = {
  todos: PropTypes.array.isRequired,
  handleClearCompletedTodos: PropTypes.func.isRequired
}