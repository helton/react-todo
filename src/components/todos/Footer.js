import React from 'react'
import { Link } from '../router'

export const Footer = () => {
  return (
    <ul className="filters">
      <li><Link to="/">All</Link></li>
      <li><Link to="/active">Active</Link></li>
      <li><Link to="/completed">Completed</Link></li>
    </ul>
  )
}