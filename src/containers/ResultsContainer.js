import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import Results from '../components/Results'

const ResultsContainer = ({ grade }) => (
  <Results
    grade={grade} />
)

ResultsContainer.propTypes = {
  grade: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    scorePercent: PropTypes.number.isRequired
  }).isRequired
}

// calculates the final grade using the score and the grade sheet
const getGrade = (score, grades) => {
  if(!grades.spec) {
    return {};
  }

  let scorePercent = (score.points / score.maxPoints) * 100
  let grade = grades.spec.results.filter((r) => {
    return (scorePercent >= r.minpoints &&
            scorePercent <= r.maxpoints)
  })[0];

  const {title, message, img} = grade;
  return {
    title,
    message,
    img,
    scorePercent
  };
}

const mapStateToProps = ({score, grades}) => ({
  grade: getGrade(score, grades)
})

export default connect(
  mapStateToProps
)(ResultsContainer)
