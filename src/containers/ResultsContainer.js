import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import Results from '../components/Results'

const ResultsContainer = ({ score }) => (
  <Results
    score={score} />
)

ResultsContainer.propTypes = {
  score: PropTypes.object.isRequired
}

const mapStateToProps = ({score}) => ({
  score: score
})

export default connect(
  mapStateToProps
)(ResultsContainer)
