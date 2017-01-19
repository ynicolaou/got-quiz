import React, { Component } from 'react'

export default class TrueFalseQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      answerGiven: event.target.id === 'true'
    });
  }

  handleNextClick(event, doAction, question) {
    this.setState({
      ...this.state,
      showAnswer: true}
    );
    // Show answer validation for 3 seconds before moving on the next one
    setTimeout(
      () => {
        doAction(question)
      }, 3000);
  }

  getAnswerValidationClass(option) {
    if(!this.state.showAnswer){
      return ""
    }
    if(option === this.props.question.correct_answer){
      return "text-success";
    }
    if(option === this.state.answerGiven &&
       this.state.answerGiven !== this.props.question.correct_answer){
      return "text-danger";
    }
    return "";
  }

  buttonsDisabled() {
    return this.state.answerGiven === undefined ||
           this.state.showAnswer === true;
  }

  render() {
    const { question, isLastQuestion, onNextClick } = this.props
    return (
      <form>
        <fieldset className="btn-group container" data-toggle="buttons">
          <label className={this.getAnswerValidationClass(true)}>
            <input id="true"
                   onChange={this.handleChange}
                   type="radio"
                   name="answerOptions"
                   autoComplete="off"
                   disabled={this.state.showAnswer} /> True
          </label>
          <label className={this.getAnswerValidationClass(false)}>
            <input id="false"
                   onChange={this.handleChange}
                   type="radio"
                   name="answerOptions"
                   autoComplete="off"
                   disabled={this.state.showAnswer} /> False
          </label>
          {isLastQuestion
            ? <button type="button"
                      className="btn btn-primary"
                      disabled={this.buttonsDisabled()}>
                Finish
              </button>
            : <button type="button"
                      className="btn btn-primary"
                      onClick={(event) => this.handleNextClick(event, onNextClick, question)}
                      disabled={this.buttonsDisabled()}>
                Next
              </button>
          }
        </fieldset>
      </form>
    )
  }
}
