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
      answerGiven: +event.target.id
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
    if(option.a_id === this.props.question.correct_answer){
      return "text-success";
    }
    if(option.a_id === this.state.answerGiven &&
       this.state.answerGiven !== this.props.question.correct_answer){
      return "text-danger";
    }
    return "";
  }

  render() {
    const { question, isLastQuestion, onNextClick } = this.props
    return (
      <form>
        <fieldset className="btn-group container" data-toggle="buttons">
          {question.possible_answers.map(option =>
            <label className={this.getAnswerValidationClass(option)} key={option.a_id} >
              <input id={option.a_id}
                     onChange={this.handleChange}
                     name="answerOptions"
                     type="radio"
                     autoComplete="off"
                     disabled={this.state.showAnswer} /> {option.caption}
            </label>
          )}
          {isLastQuestion
            ? <button type="button"
                      className="btn btn-primary"
                      disabled={!this.state.answerGiven === undefined}>
                Finish
              </button>
            : <button type="button"
                      className="btn btn-primary"
                      onClick={(event) => this.handleNextClick(event, onNextClick, question)}
                      disabled={this.state.answerGiven === undefined}>
                Next
              </button>
          }
        </fieldset>
      </form>
    )
  }
}
