import { SET_BOOKS } from '../constants'

const initialState = []

const catalogReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_BOOKS:
      return [...action.payload]
    default:
      return state
  }
}

export default catalogReducer