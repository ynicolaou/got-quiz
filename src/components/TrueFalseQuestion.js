import React from 'react'

const TrueFalseQuestion = ({ question }) => {
  return (
    <fieldset className="btn-group container" data-toggle="buttons">
	    <label className="btn btn-primary">
	      <input type="radio" autoComplete="off" /> True
	    </label>
	    <label className="btn btn-primary">
	      <input type="radio" autoComplete="off" /> False
	    </label>
    </fieldset>
  );
}

export default TrueFalseQuestion
