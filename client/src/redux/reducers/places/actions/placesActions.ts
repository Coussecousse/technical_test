import { Dispatch } from "redux";
import { UPDATE_PLACES } from "../placesActionTypes";

export const updatePlaces = () => {
    return async (dispatch: Dispatch) => {
        try {
          const response = await fetch('/get-places');
          const data = await response.json();
          dispatch({ type: UPDATE_PLACES, payload: data });
        } catch (error) {
          console.log(error);
        }
      };
};
