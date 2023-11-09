import { combineReducers } from "@reduxjs/toolkit";
import menuReducer from "./reducers/menu/menuReducer";
import placesReducer from "./reducers/places/placesReducer";

const rootReducer = combineReducers({
    menu: menuReducer,
    places: placesReducer
})

export default rootReducer;