import React from 'react'
import { Link } from '../router'

export const Footer = () => {
  return (
    <div className="Footer">
      <Link to="/">All</Link>
      <Link to="/active">Active</Link>
      <Link to="/completed">Completed</Link>
    </div>
  )
}