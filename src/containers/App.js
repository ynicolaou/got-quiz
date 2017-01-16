import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchQuizIfNeeded } from '../actions'

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
    console.log(spec)
    return (
      <div>
        {isLoadingSpec
          ? <h2>Loading...</h2>
          : <div>
              <h1>{spec.title}</h1>
            </div>
        }
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { quiz } = state
  const { spec, isFetching} = quiz

  return {
    quiz: {
      isFetching,
      spec: spec || {}
    }
  }
}

export default connect(mapStateToProps)(App)

