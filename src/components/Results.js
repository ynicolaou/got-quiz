import React, { Component } from 'react'

export default class Results extends Component {

  render() {
    const {img, title, message, scorePercent} = this.props.grade
    return (
      <div className="card" style={{width: "90%"}}>
        <img src={img}
             alt={title}
             className="card-img-top"/>
        <div className="card-block">
          <h4 className="card-title">{title}</h4>
          <h4 className="card-title">{scorePercent}%</h4>
          <p className="card-text">{message}</p>
        </div>
      </div>
    )
  }
}
