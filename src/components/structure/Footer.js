import React from 'react'
import PropTypes from 'prop-types'
import { TodoFilters } from '../todos/'

export const Footer = props => {
  return (
    <footer className="footer">
      <TodoFilters 
        todos={props.todos}
        handleClearCompletedTodos={props.handleClearCompletedTodos}/>
    </footer>
  )
}

Footer.propTypes = {
  todos: PropTypes.array.isRequired,
  handleClearCompletedTodos: PropTypes.func.isRequired
}