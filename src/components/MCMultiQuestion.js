import React from 'react'

const MCMultiQuestion = ({ question }) => {
  return (
    <fieldset className="btn-group container" data-toggle="buttons">
      {question.possible_answers.map(option =>
        <label key={option.a_id} >
          <input type="checkbox" autoComplete="off" /> {option.caption}
        </label>
      )}
    </fieldset>
  );
}

export default MCMultiQuestion
