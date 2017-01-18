import React from 'react'

const MCSingleQuestion = ({ question }) => {
  return (
    <fieldset className="btn-group container" data-toggle="buttons">
      {question.possible_answers.map(option =>
        <label key={option.a_id} >
          <input name="answerOptions" type="radio" autoComplete="off" /> {option.caption}
        </label>
      )}
    </fieldset>
  );
}

export default MCSingleQuestion
