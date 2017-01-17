import { connect } from 'react-redux'
import { nextQuestion } from '../actions'
import Question from '../components/Question'

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
  onNextClick: nextQuestion
})

const CurrentQuestion = connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)

export default CurrentQuestion
