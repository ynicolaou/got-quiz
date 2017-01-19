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

  handleNextClick(event, goToNext, question, registerScore) {
    this.setState({
      ...this.state,
      showAnswer: true}
    );

    let pointsScored = this.state.answerGiven === question.correct_answer
                        ? question.points
                        : 0;
    // Show answer validation for 3 seconds before moving on the next one
    setTimeout(
      () => {
        registerScore(pointsScored, question.points)
        goToNext()
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

  buttonsDisabled() {
    return this.state.answerGiven === undefined ||
           this.state.showAnswer === true;
  }

  render() {
    const { question, isLastQuestion, onNextClick, registerScore } = this.props
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
                      disabled={this.buttonsDisabled()}>
                Finish
              </button>
            : <button type="button"
                      className="btn btn-primary"
                      onClick={(event) => this.handleNextClick(event, onNextClick, question, registerScore)}
                      disabled={this.buttonsDisabled()}>
                Next
              </button>
          }
        </fieldset>
      </form>
    )
  }
}
