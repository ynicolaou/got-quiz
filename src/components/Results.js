import React, { Component } from 'react'

export default class Results extends Component {

  render() {
    const {img, title, message, scorePercent} = this.props.grade
    return (
      <div>
        <img src={img}
             alt={title}
             className="img-thumbnail"/>
        <p>{title}</p>
        <p>{message}</p>
        <p>{scorePercent}%</p>
      </div>
    )
  }
}
