import { combineReducers } from "@reduxjs/toolkit";
import menuReducer from "./reducers/menuReducer";

const rootReducer = combineReducers({
    menu: menuReducer
})

export default rootReducer;