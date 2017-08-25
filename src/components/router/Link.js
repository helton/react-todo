import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Link extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired
  }

  static contextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }

  handleClick(evt) {
    evt.preventDefault()
    this.context.linkHandler(this.props.to)
  }

  render() {
    const className = this.context.route === this.props.to ? 'selected' : ''
    return (
      <a
        href="#/"
        className={className}
        onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </a>
    )
  }
}
 