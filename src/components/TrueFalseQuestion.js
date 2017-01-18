import React from 'react'

const TrueFalseQuestion = ({ question }) => {
  return (
    <fieldset className="btn-group container" data-toggle="buttons">
	    <label>
	      <input type="radio" name="answerOptions" autoComplete="off" /> True
	    </label>
	    <label>
	      <input type="radio" name="answerOptions" autoComplete="off" /> False
	    </label>
    </fieldset>
  );
}

export default TrueFalseQuestion
