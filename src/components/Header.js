import React, { PropTypes } from 'react'

const Header = ({ title, description }) => {

  return (
    <div className="header">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Header
