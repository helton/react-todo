import React from 'react'
import PropTypes from 'prop-types'
import { TodoForm } from '../todos'

export const Header = props => {
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoForm
        currentTodo={props.currentTodo}
        handleInputChange={props.handleInputChange}
        handleSubmit={props.handleSubmit}/>
    </header>
  )
}

Header.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  currentTodo: PropTypes.string.isRequired
}