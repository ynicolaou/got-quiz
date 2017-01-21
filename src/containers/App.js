import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchQuizIfNeeded, fetchGradesIfNeeded } from '../actions'
import Header from '../components/Header'
import QuestionContainer from './QuestionContainer'
import ResultsContainer from './ResultsContainer'

class App extends Component {

  static propTypes = {
    showResults: PropTypes.bool.isRequired,
    quiz: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      spec: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        questions: PropTypes.array.isRequired
      }).isRequired
    }).isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchQuizIfNeeded())
    dispatch(fetchGradesIfNeeded())
  }

  render() {
    const { spec, isFetching } = this.props.quiz
    const isLoadingQuiz = !spec && isFetching
    return (
      <div className="container">
        {isLoadingQuiz
          ? <h2>Loading...</h2>
          : <div>
              <Header title={spec.title} description={spec.description} />
              {this.props.showResults
                ? <ResultsContainer />
                : <QuestionContainer />
              }
            </div>
        }
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { quiz, showResults } = state
  const { spec, isFetching} = quiz

  return {
    showResults: showResults || false,
    quiz: {
      isFetching: isFetching || false,
      spec: spec || {
        title: "",
        description: "",
        questions: []
      }
    }
  }
}

export default connect(mapStateToProps)(App)

