import { combineReducers } from "@reduxjs/toolkit";

import cartReducer from "./cart/cartReducer";
import catalogReducer from "./catalog/catalogReducer";

const rootReducer = combineReducers({
  books: catalogReducer,
  cart: cartReducer
})

export default rootReducer