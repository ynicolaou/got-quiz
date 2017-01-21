import React, { Component } from 'react'
import classNames from 'classnames'

export default class MCSingleQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  //When an answer is selected set it on the component's state
  handleChange(event) {
    this.setState({
      answerGiven: +event.target.id
    });
  }

  // When the next/finish button is pressed, persist the current score to the store,
  // and proceed to the next question or to the results view
  handleNextClick(event, { question, isLastQuestion, nextQuestion, registerScore, showResults }) {
    this.setState({
      ...this.state,
      showAnswer: true}
    );

    let pointsScored = this.state.answerGiven === question.correct_answer
                        ? question.points
                        : 0;
    // Show answer validation for 3 seconds before moving on to the next one
    setTimeout(
      () => {
        registerScore(pointsScored, question.points);
        if(!isLastQuestion) {
          nextQuestion();
        } else {
          showResults();
        }
      }, 3000);
  }

  // Determines what css class to use when validating this option against the correct answer
  getAnswerValidationClass(option) {
    //not ready to give the answer yet
    if(!this.state.showAnswer){
      return ""
    }
    //correct answer
    if(option.a_id === this.props.question.correct_answer){
      return "text-success";
    }
    //selected but not the correct answer
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
    const { question, isLastQuestion } = this.props
    return (
      <form>
        <fieldset className="form-group">
          {question.possible_answers.map(option =>
            <div key={option.a_id} className="form-check">
              <label className={classNames("form-check-label", this.getAnswerValidationClass(option))}>
                <input className="form-check-input"
                       id={option.a_id}
                       onChange={this.handleChange}
                       name="answerOptions"
                       type="radio"
                       autoComplete="off"
                       disabled={this.state.showAnswer} /> {option.caption}
              </label>
            </div>
          )}
        </fieldset>
        <button type="button"
                className="btn btn-primary"
                onClick={(event) => this.handleNextClick(event, this.props)}
                disabled={this.buttonsDisabled()}>
          {isLastQuestion ? 'Finish' : 'Next'}
        </button>
      </form>
    )
  }
}
