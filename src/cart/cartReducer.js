import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants"

const initialState = []

const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TO_CART:
      return [...state, action.payload]
    case REMOVE_FROM_CART:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ]
    default:
      return state
  }
}

export default cartReducer
