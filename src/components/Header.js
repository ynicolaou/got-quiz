import React, { PropTypes } from 'react'

const Header = ({ title, description }) => {

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-3">{title}</h1>
        <p className="lead">{description}</p>
      </div>
   </div>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Header
