import React, { Component } from 'react'
import classNames from 'classnames'

export default class MCMultiQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  //When an answer is selected set it on the component's state
  handleChange(event) {
    let answerGiven = this.state.answerGiven || [];
    if(event.target.checked){
      answerGiven.push(+event.target.id);
    }
    this.setState({
      ...this.state,
      answerGiven
    });
  }

  // When the next/finish button is pressed, persist the current score to the store,
  // and proceed to the next question or to the results view
  handleNextClick(event, { nextQuestion, question, registerScore, isLastQuestion, showResults }) {
    this.setState({
      ...this.state,
      showAnswer: true}
    );
    let pointsScored = this.state.answerGiven.sort().join(',') === question.correct_answer.sort().join(',')
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
    if(this.props.question.correct_answer.indexOf(option.a_id) >= 0){
      return "text-success";
    }
    //selected but not the correct answer
    if(this.state.answerGiven.indexOf(option.a_id) >= 0 &&
       this.props.question.correct_answer.indexOf(option.a_id) === -1){
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
                       type="checkbox"
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
