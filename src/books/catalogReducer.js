import { LOAD_BOOKS } from '../constants'

const initialState = []

const catalogReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_BOOKS:
      console.log(action.payload)
      return [...action.payload]
    default:
      return state
  }
}

export default catalogReducer