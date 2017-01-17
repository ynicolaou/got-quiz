import { combineReducers } from 'redux'
import {
  REQUEST_QUIZ, RECEIVE_QUIZ,
  NEXT_QUESTION
} from '../actions'

const quiz = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_QUIZ:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_QUIZ:
      return {
        ...state,
        isFetching: false,
        spec: action.quiz
      }
    default:
      return state
  }
}

const currentIndex = (state = 0, action) => {
  switch (action.type) {
    case NEXT_QUESTION:
      return ++state;
    case REQUEST_QUIZ:
    case RECEIVE_QUIZ:
    default:
      return state
  }
}

const rootReducer = combineReducers({
  quiz,
  currentIndex
})

export default rootReducer
