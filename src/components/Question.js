import React, { PropTypes } from 'react'
import MCSingleQuestion from '../components/MCSingleQuestion'
import MCMultiQuestion from '../components/MCMultiQuestion'
import TrueFalseQuestion from '../components/TrueFalseQuestion'

const getQuestionOptions = (question) => {
  switch(question.question_type) {
    case "mutiplechoice-single":
      return <MCSingleQuestion question={question} />
    case "mutiplechoice-multiple":
      return <MCMultiQuestion question={question} />
    case "truefalse":
      return <TrueFalseQuestion question={question} />
    default:
      return null;
  }
}

const Question = ({ question, isLastQuestion, onNextClick}) => {
  let questionOptions = getQuestionOptions(question);
  return (
    <form>
      <img src={question.img}
           alt={question.title}
           className="img-thumbnail"/>
      <p>{question.title}</p>
      {questionOptions}
      {isLastQuestion
        ? <button type="button"
                  className="btn btn-primary">
            Finish
          </button>
        : <button type="button"
                  className="btn btn-primary"
                  onClick={() => onNextClick(question)}>
            Next
          </button>
      }
    </form>
  );
}

Question.propTypes = {
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
  onNextClick: PropTypes.func.isRequired
}

export default Question
