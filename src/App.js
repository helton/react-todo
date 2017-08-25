import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NotificationSystem from 'react-notification-system'
import ReactAutoBinder from 'react-auto-binder'
import './App.css'
import { TodoForm, TodoList, Footer } from './components/todos/'
import { generateId, addTodo, findById, toggleTodo, updateTodo, removeTodo, filterTodos } from './lib/todoHelpers'
import { partial, pipe } from './lib/utils'
import { loadTodos, createTodo, saveTodo, destroyTodo } from './lib/todoService'

class App extends Component {
  static contextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }

  state = {
    todos: [],
    editing: null,
    currentTodo: ''
  }

  handleRemove(id, evt) {
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({ todos: updatedTodos })
    destroyTodo(id)
      .then(() => this.notify('Todo Removed'))
  }

  handleToggle(id) {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const pipeline = partial(updateTodo, this.state.todos)
    const todos = pipeline(updated)
    this.setState({ todos })
    saveTodo(updated)
      .then(() => this.notify('Todo Updated'))
  }

  handleToggleAll(evt) {
    const completed = evt.target.checked
    const todos = this.state.todos.map(todo => {
      const updated = {...todo, isCompleted: completed}
      saveTodo(updated)
      return updated
    })
    this.setState({ todos })
  }
  
  handleSubmit() {
    const newTodo = { 
      id: generateId(),
      name: this.state.currentTodo,
      isCompleted: false
    }
    const todos = addTodo(this.state.todos, newTodo)
    this.setState({ 
      todos,
      currentTodo: ''
    })
    createTodo(newTodo)
      .then(() => this.notify('Todo Added'))
  }

  handleEmptySubmit() {
    this.notify('Please supply a todo name', 'error')
  }

  handleInputChange(evt) {
    this.setState({ currentTodo: evt.target.value })
  }

  handleEdit(id) {
    this.setState({ editing: id })
  }

  handleUpdate(name, id) {
    if (this.state.editing) {
      const todo = findById(id, this.state.todos)
      if (todo.name !== name) {
        const updated = { ...todo, name }
        const todos = updateTodo(this.state.todos, updated)
        this.setState({ todos, editing: null })
        saveTodo(updated)
          .then(() => this.notify('Todo Updated'))
      } else {
        this.setState({ editing: null })
      }
    }
  }

  notify(message, level='info') {
    this.refs.notificationSystem.addNotification({
      message,
      level,
      position: 'tr'
    });
  }

  clearCompletedTodos() {
    this.state.todos
      .filter(todo => todo.isCompleted)
      .forEach(todo => destroyTodo(todo.id))
    const todos = this.state.todos.filter(todo => !todo.isCompleted)
    this.setState({ todos })
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({ todos }))
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    const activeTodoCount = this.state.todos.filter(todo => !todo.isCompleted).length
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NotificationSystem ref="notificationSystem"/>
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}/>
        </header>
        <section className="main">
          <input type="checkbox" defaultChecked={true} className="toggle-all" onClick={this.handleToggleAll}/>
          <TodoList
            todos={displayTodos}
            editing={this.state.editing}
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}
            handleEdit={this.handleEdit}
            handleUpdate={this.handleUpdate}/>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{activeTodoCount}</strong> item{ activeTodoCount > 1 ? 's' : ''} left
          </span>
          <Footer />
          <button
            className="clear-completed"
            onClick={this.clearCompletedTodos}>
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default ReactAutoBinder(App)
