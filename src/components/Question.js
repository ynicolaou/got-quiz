import React, { PropTypes } from 'react'

const Question = ({ question, isLastQuestion, onNextClick}) => {
  return (
    <div>
      <img src={question.img} alt={question.title} className="img-thumbnail" />
      <p>{question.title}</p>
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
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    question_type: PropTypes.string.isRequired}).isRequired,
  onNextClick: PropTypes.func.isRequired
}

export default Question
