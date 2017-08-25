import React from 'react'
import PropTypes from 'prop-types'
import { TodoList } from '../todos'

export const Article = props => {
  return (
    <article className="main">
      <TodoList
        todos={props.todos}
        editing={props.editing}
        handleToggle={props.handleToggle}
        handleRemove={props.handleRemove}
        handleEdit={props.handleEdit}
        handleUpdate={props.handleUpdate}
        handleToggleAll={props.handleToggleAll}/>
    </article>
  )
}

Article.propTypes = {
  todos: PropTypes.array.isRequired,
  editing: PropTypes.number,
  handleToggle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired,
}