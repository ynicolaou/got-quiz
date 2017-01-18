import React, { Component } from 'react'

export default class MCSingleQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      answer_given: +event.target.id
    });
  }

  handleNextClick(event, doAction, question) {
    this.setState({
      ...this.state,
      showValidation: true}
    );
    // Show answer validation for 3 seconds before moving on the next one
    setTimeout(
      () => {
        doAction(question)
      }, 3000);
  }

  render() {
    console.log(this.state)
    const { question, isLastQuestion, onNextClick } = this.props
    return (
      <form>
        <fieldset className="btn-group container" data-toggle="buttons">
          {question.possible_answers.map(option =>
            <label key={option.a_id} >
              <input id={option.a_id}
                     onChange={this.handleChange}
                     name="answerOptions"
                     type="radio"
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
                      onClick={(event) => this.handleNextClick(event, onNextClick, question)}>
                Next
              </button>
          }
        </fieldset>
      </form>
    )
  }
}
