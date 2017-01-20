import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { nextQuestion, registerScore, showResults } from '../actions'
import MCSingleQuestion from '../components/MCSingleQuestion'
import MCMultiQuestion from '../components/MCMultiQuestion'
import TrueFalseQuestion from '../components/TrueFalseQuestion'

const getAnswerOptions = ({ question, isLastQuestion, nextQuestion, registerScore, showResults }) => {
  switch(question.question_type) {
    case "mutiplechoice-single":
      return <MCSingleQuestion key={question.q_id}
                               question={question}
                               isLastQuestion={isLastQuestion}
                               nextQuestion={nextQuestion}
                               registerScore={registerScore}
                               showResults={showResults} />
    case "mutiplechoice-multiple":
      return <MCMultiQuestion key={question.q_id}
                              question={question}
                              isLastQuestion={isLastQuestion}
                              nextQuestion={nextQuestion}
                              registerScore={registerScore}
                              showResults={showResults} />
    case "truefalse":
      return <TrueFalseQuestion key={question.q_id}
                                question={question}
                                isLastQuestion={isLastQuestion}
                                nextQuestion={nextQuestion}
                                registerScore={registerScore}
                                showResults={showResults} />
    default:
      return null;
  }
}

const QuestionContainer = (props) => {
  let answerOptions = getAnswerOptions(props);
  return (
    <div>
      <img src={props.question.img}
           alt={props.question.title}
           className="img-thumbnail"/>
      <p>{props.question.title}</p>
      {answerOptions}
    </div>
  );
}

QuestionContainer.propTypes = {
  question: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    question_type: PropTypes.string.isRequired,
    correct_answer: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number,
      PropTypes.arrayOf(PropTypes.number)
    ]).isRequired,
    points: PropTypes.number.isRequired,
    possible_answers: PropTypes.arrayOf(PropTypes.shape({
      a_id: PropTypes.number.isRequired,
      caption: PropTypes.string.isRequired
    })).isOptional}).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  showResults: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  registerScore: PropTypes.func.isRequired
}

const blankQuestion = {
  img: "",
  title: "",
  question_type: "",
  correct_answer: 0,
  points: 0
}

const getCurrentQuestion = (quiz, currentIndex) => {
  if(!quiz.spec){
    return blankQuestion;
  }

  return quiz.spec.questions[currentIndex];
}

const isLastQuestion = (quiz, currentIndex) => {
  if(!quiz.spec){
    return false;
  }

  return quiz.spec.questions.length <= currentIndex+1;
}

const mapStateToProps = ({quiz, currentIndex}) => ({
  question: getCurrentQuestion(quiz, currentIndex),
  isLastQuestion: isLastQuestion(quiz, currentIndex)
})

const mapDispatchToProps =  ({
  nextQuestion,
  registerScore,
  showResults
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionContainer)
