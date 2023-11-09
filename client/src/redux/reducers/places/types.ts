import { UPDATE_PLACES } from "./placesActionTypes";

interface UpdatePlacesAction {
    type: typeof UPDATE_PLACES,
    payload: Array<Object>
}

export type PlacesActionTypes = UpdatePlacesAction;

export interface SystemState {
    places: Array<Object>
}