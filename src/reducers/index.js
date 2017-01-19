import { combineReducers } from 'redux'
import {
  REQUEST_QUIZ, RECEIVE_QUIZ,
  NEXT_QUESTION, REGISTER_SCORE
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

const score = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_SCORE:
      return {
        ...state,
        points: state.points ? state.points+action.score : action.score,
        maxPoints: state.maxPoints ? state.maxPoints+action.maxPoints : action.maxPoints
      };
    case NEXT_QUESTION:
    case REQUEST_QUIZ:
    case RECEIVE_QUIZ:
    default:
      return state
  }
}

const rootReducer = combineReducers({
  quiz,
  currentIndex,
  score
})

export default rootReducer
