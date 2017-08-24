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
    this.context.linkHandler(this.props.to)
  }

  render() {
    const activeClass = this.context.route === this.props.to ? 'active' : ''
    return (
      <button
        className={activeClass}
        onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </button>
    )
  }
}
 