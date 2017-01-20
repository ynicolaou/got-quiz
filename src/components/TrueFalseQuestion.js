import React, { Component } from 'react'
import classNames from 'classnames'

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

  handleNextClick(event, goToNext, question, registerScore, isLastQuestion) {
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
        registerScore(pointsScored, question.points);
        if(!isLastQuestion) {
          goToNext();
        }
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
    const { question, isLastQuestion, onNextClick, registerScore } = this.props
    return (
      <form>
        <fieldset className="form-group">
          <div className="form-check">
            <label className={classNames("form-check-label", this.getAnswerValidationClass(true))}>
              <input className="form-check-input"
                     id="true"
                     onChange={this.handleChange}
                     type="radio"
                     name="answerOptions"
                     autoComplete="off"
                     disabled={this.state.showAnswer} /> True
            </label>
          </div>
          <div className="form-check">
            <label className={classNames("form-check-label", this.getAnswerValidationClass(false))}>
              <input className="form-check-input"
                     id="false"
                     onChange={this.handleChange}
                     type="radio"
                     name="answerOptions"
                     autoComplete="off"
                     disabled={this.state.showAnswer} /> False
            </label>
          </div>
        </fieldset>
        <button type="button"
                className="btn btn-primary"
                onClick={(event) => this.handleNextClick(event, onNextClick, question, registerScore, isLastQuestion)}
                disabled={this.buttonsDisabled()}>
          {isLastQuestion ? 'Finish' : 'Next'}
        </button>
      </form>
    )
  }
}
