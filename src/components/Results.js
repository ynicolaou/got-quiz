import React, { PropTypes, Component } from 'react'

export default class Results extends Component {

  static propTypes = {
    score: PropTypes.object.isRequired
  }

  render() {
    return (
      <span>RESULTS!!!</span>
    )
  }
}
