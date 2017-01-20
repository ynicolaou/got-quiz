export const REQUEST_QUIZ = 'REQUEST_QUIZ'
export const RECEIVE_QUIZ = 'RECEIVE_QUIZ'
export const NEXT_QUESTION = 'NEXT_QUESTION'
export const REGISTER_SCORE = 'REGISTER_SCORE'
export const REQUEST_GRADES = 'REQUEST_GRADES'
export const RECEIVE_GRADES = 'RECEIVE_GRADES'

const fetchJson = (dispatch, requestAction, receiveAction, jsonUrl) => {
  dispatch(requestAction())
  return fetch(jsonUrl)
    .then(response => response.json())
    .then(json => dispatch(receiveAction(json)))
}

const shouldFetchJson = (value, isFetching) => {
  if(!value) {
    return true;
  }
  if(isFetching) {
    return false;
  }
  return false;
}

export const requestQuiz = () => ({
  type: REQUEST_QUIZ
})

export const receiveQuiz = (json) => ({
  type: RECEIVE_QUIZ,
  quiz: json
})

const fetchQuiz = () => dispatch =>
  fetchJson(dispatch,
            requestQuiz,
            receiveQuiz,
            `https://proto.io/en/jobs/candidate-questions/quiz.json`)

export const fetchQuizIfNeeded = () => (dispatch, getState) => {
  if(shouldFetchJson(getState().quiz.spec, getState().isFetching)) {
    return dispatch(fetchQuiz())
  }
}

export const nextQuestion = () => ({
  type: NEXT_QUESTION
})

export const registerScore = (score, maxPoints) => ({
  type: REGISTER_SCORE,
  score: score,
  maxPoints: maxPoints
})

export const requestGrades = () => ({
  type: REQUEST_GRADES
})

export const receiveGrades = (json) => ({
  type: RECEIVE_GRADES,
  grades: json
})

const fetchGrades = () => dispatch =>
  fetchJson(dispatch,
            requestGrades,
            receiveGrades,
            `https://proto.io/en/jobs/candidate-questions/result.json`)

export const fetchGradesIfNeeded = () => (dispatch, getState) => {
  if(shouldFetchJson(getState().grades.spec, getState().isFetching)) {
    return dispatch(fetchGrades())
  }
}
