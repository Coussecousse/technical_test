import { combineReducers } from "@reduxjs/toolkit";
import menuReducer from "./reducers/menu/menuReducer";

const rootReducer = combineReducers({
    menu: menuReducer
})

export default rootReducer;