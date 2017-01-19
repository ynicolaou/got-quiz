import React, { Component } from 'react'

export default class MCMultiQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.state = {
      answerChoice: event.target.id
    }
    console.log(event.target.id);
    console.log(event.target.checked);
  }

  render() {
    const { question, isLastQuestion, onNextClick } = this.props
    return (
      <form>
        <fieldset className="btn-group container" data-toggle="buttons">
          {question.possible_answers.map(option =>
            <label key={option.a_id} >
              <input id={option.a_id}
                     onChange={this.handleChange}
                     type="checkbox"
                     autoComplete="off" /> {option.caption}
            </label>
          )}
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
