import { OPEN_MENU, CLOSE_MENU } from "./actionTypes";
import { MenuActionTypes } from "./types";

const initialState = {
    value : false
}

export default (state = initialState, action: MenuActionTypes) => {
    switch(action.type) {
        case OPEN_MENU: 
            return {...state, value : true}
        case CLOSE_MENU: 
            return {...state, value : false}
        default : 
            return state
    }
}

