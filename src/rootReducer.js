import { combineReducers } from "@reduxjs/toolkit";

import catalogReducer from "./books/catalogReducer";

const rootReducer = combineReducers({
  books: catalogReducer
})

export default rootReducer