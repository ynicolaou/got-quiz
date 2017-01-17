import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchQuizIfNeeded } from '../actions'
import Header from '../components/Header'
import CurrentQuestion from './CurrentQuestion'

class App extends Component {

  static propTypes = {
    quiz: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchQuizIfNeeded())
  }

  render() {
    const { spec, isFetching } = this.props.quiz
    const isLoadingSpec = !spec && isFetching
    return (
      <div className="container">
        {isLoadingSpec
          ? <h2>Loading...</h2>
          : <div>
              <Header title={spec.title} description={spec.description} />
              <CurrentQuestion />
            </div>
        }
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { quiz, currentIndex } = state
  const { spec, isFetching} = quiz

  return {
    currentIndex: currentIndex || 0,
    quiz: {
      isFetching,
      spec: spec || {
        title: "",
        description: "",
        questions: []
      }
    }
  }
}

export default connect(mapStateToProps)(App)

