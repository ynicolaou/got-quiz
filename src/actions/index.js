export const REQUEST_QUIZ = 'REQUEST_QUIZ'
export const RECEIVE_QUIZ = 'RECEIVE_QUIZ'
export const NEXT_QUESTION = 'NEXT_QUESTION'

export const requestQuiz = () => ({
  type: REQUEST_QUIZ
})

export const receiveQuiz = (json) => ({
  type: RECEIVE_QUIZ,
  quiz: json
})

const fetchQuiz = () => dispatch => {
  dispatch(requestQuiz())
  return fetch(`https://proto.io/en/jobs/candidate-questions/quiz.json`)
    .then(response => response.json())
    .then(json => dispatch(receiveQuiz(json)))
}

const shouldFetchQuiz = (state) => {
  const quizSpec = state.quiz.spec
  if (!quizSpec) {
    return true
  }
  if (state.isFetching) {
    return false
  }
  return false
}

export const fetchQuizIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchQuiz(getState())) {
    return dispatch(fetchQuiz())
  }
}

export const nextQuestion = () => ({
  type: NEXT_QUESTION
})
