import React, { PropTypes } from 'react'
import MCSingleQuestion from '../components/MCSingleQuestion'
import MCMultiQuestion from '../components/MCMultiQuestion'
import TrueFalseQuestion from '../components/TrueFalseQuestion'

const getAnswerOptions = (question, isLastQuestion, onNextClick) => {
  switch(question.question_type) {
    case "mutiplechoice-single":
      return <MCSingleQuestion key={question.q_id}
                               question={question}
                               isLastQuestion={isLastQuestion}
                               onNextClick={onNextClick} />
    case "mutiplechoice-multiple":
      return <MCMultiQuestion key={question.q_id}
                              question={question}
                              isLastQuestion={isLastQuestion}
                              onNextClick={onNextClick} />
    case "truefalse":
      return <TrueFalseQuestion key={question.q_id}
                                question={question}
                                isLastQuestion={isLastQuestion}
                                onNextClick={onNextClick} />
    default:
      return null;
  }
}

const Question = ({ question, isLastQuestion, onNextClick}) => {
  let answerOptions = getAnswerOptions(question, isLastQuestion, onNextClick);
  return (
    <div>
      <img src={question.img}
           alt={question.title}
           className="img-thumbnail"/>
      <p>{question.title}</p>
      {answerOptions}
    </div>
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
