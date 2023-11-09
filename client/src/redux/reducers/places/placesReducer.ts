import { UPDATE_PLACES } from "./placesActionTypes";
import { PlacesActionTypes } from "./types";

const initiateState = {
    places : []
}

export default (state = initiateState, action: PlacesActionTypes) => {
    switch(action.type) {
        case UPDATE_PLACES: 
            
            return {...state, 
                places : action.payload
            };
        default : 
            return state
    }
}