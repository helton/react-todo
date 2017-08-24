import React, { Component } from 'react'
import PropTypes from 'prop-types'

const getCurrentPath = () => {
  const path = document.location.pathname
  return path.substring(path.lastIndexOf('/'))
}

export class Router extends Component {
  static childContextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }

  getChildContext() {
    return {
      route: this.state.route,
      linkHandler: this.handleLinkClick.bind(this)
    }
  }

  state = {
    route: getCurrentPath()
  }

  handleLinkClick(route) {
    this.setState({ route })
    window.history.pushState(null, '', route)
  }

  componentDidMount() {
    window.onpopstate = () => {
      this.setState({ route: getCurrentPath() })
    }    
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}