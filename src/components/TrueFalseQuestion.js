import React, { Component } from 'react'

export default class TrueFalseQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      answer_given: event.target.id === 'true'
    });
    console.log(this.state);
  }

  render() {
    const { question, isLastQuestion, onNextClick } = this.props
    return (
      <form>
        <fieldset className="btn-group container" data-toggle="buttons">
          <label>
            <input id="true"
                   onChange={this.handleChange}
                   type="radio"
                   name="answerOptions"
                   autoComplete="off" /> True
          </label>
          <label>
            <input id="false"
                   onChange={this.handleChange}
                   type="radio"
                   name="answerOptions"
                   autoComplete="off" /> False
          </label>
          {isLastQuestion
            ? <button type="button"
                      className="btn btn-primary">
                Finish
              </button>
            : <button type="button"
                      className="btn btn-primary"
                      onClick={() => onNextClick(question)}>
                Next
              </button>
          }
        </fieldset>
      </form>
    )
  }
}
