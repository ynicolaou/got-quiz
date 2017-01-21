import { combineReducers } from 'redux'
import {
  REQUEST_QUIZ, RECEIVE_QUIZ,
  NEXT_QUESTION, REGISTER_SCORE,
  REQUEST_GRADES, RECEIVE_GRADES,
  SHOW_RESULTS
} from '../actions'

/*
 * quiz store
 * Stores the quiz spec and its loading state
 */
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

/*
 * grades store
 * Stores the grade sheet spec and its loading state
 */
const grades = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_GRADES:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_GRADES:
      return {
        ...state,
        isFetching: false,
        spec: action.grades
      }
    default:
      return state
  }
}

/*
 * currentIndex store
 * Stores the current question index
 */
const currentIndex = (state = 0, action) => {
  switch (action.type) {
    case NEXT_QUESTION:
      return ++state;
    default:
      return state
  }
}

/*
 * score store
 * Stores the score so far including points earned and max points
 */
const score = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_SCORE:
      return {
        ...state,
        points: state.points ? state.points+action.points : action.points,
        maxPoints: state.maxPoints ? state.maxPoints+action.maxPoints : action.maxPoints
      };
    default:
      return state
  }
}

/*
 * showResults store
 * Controls showing the results screen
 */
const showResults = (state = false, action) => {
  switch (action.type) {
    case SHOW_RESULTS:
      return true;
    default:
      return state
  }
}

const rootReducer = combineReducers({
  quiz,
  grades,
  currentIndex,
  score,
  showResults
})

export default rootReducer
