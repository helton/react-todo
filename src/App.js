import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactAutoBinder from 'react-auto-binder'
import logo from './logo.svg'
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
    currentTodo: ''
  }

  handleRemove(id, evt) {
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({ todos: updatedTodos })
    destroyTodo(id)
      .then(() => this.showTemporaryMessage('Todo Removed'))
  }

  handleToggle(id) {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const pipeline = partial(updateTodo, this.state.todos)
    const todos = pipeline(updated)
    this.setState({ todos })
    saveTodo(updated)
      .then(() => this.showTemporaryMessage('Todo Updated'))
  }
  
  handleSubmit(evt) {
    evt.preventDefault()
    const newTodo = { 
      id: generateId(),
      name: this.state.currentTodo,
      isCompleted: false
    }
    const todos = addTodo(this.state.todos, newTodo)
    this.setState({ 
      todos,
      currentTodo: '',
      errorMessage: ''
    })
    createTodo(newTodo)
      .then(() => this.showTemporaryMessage('Todo Added'))
  }

  handleEmptySubmit(evt) {
    evt.preventDefault()
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  handleInputChange(evt) {
    this.setState({ currentTodo: evt.target.value })
  }

  showTemporaryMessage(message) {
    this.setState({ message })
    setTimeout(() => {
      this.setState({ message: '' })
    }, 2500)
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({ todos }))
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
        {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
        {this.state.message && <span className="success">{this.state.message}</span>}
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}/>
          <TodoList
            todos={displayTodos}
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default ReactAutoBinder(App)
