import React, { Component } from 'react'

export default class MCMultiQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

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

  handleNextClick(event, goToNext, question, registerScore) {
    this.setState({
      ...this.state,
      showAnswer: true}
    );
    let pointsScored = this.state.answerGiven.sort().join(',') === question.correct_answer.sort().join(',')
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
    if(this.props.question.correct_answer.indexOf(option.a_id) >= 0){
      return "text-success";
    }
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
    const { question, isLastQuestion, onNextClick, registerScore } = this.props
    return (
      <form>
        <fieldset className="btn-group container" data-toggle="buttons">
          {question.possible_answers.map(option =>
            <label key={option.a_id}
                   className={this.getAnswerValidationClass(option)}>
              <input id={option.a_id}
                     onChange={this.handleChange}
                     type="checkbox"
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
