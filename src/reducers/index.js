import { combineReducers } from 'redux'
import {
  REQUEST_QUIZ, RECEIVE_QUIZ
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

const rootReducer = combineReducers({
  quiz
})

export default rootReducer
