import { combineReducers } from "@reduxjs/toolkit";

import catalogReducer from "./catalog/catalogReducer";

const rootReducer = combineReducers({
  books: catalogReducer
})

export default rootReducer