// frontend/src/store/spots.js
import { csrfFetch } from "./csrf";

//Action Types
const LOAD_SPOTS = 'spots/LOAD_SPOTS';

//Action Creators
export const getAllSpotsAction = (spots) => {
  const spotsObject = {};
  spots.forEach((spot) => {
    spotsObject[spot.id] = spot;
  });

  return {
    type: LOAD_SPOTS,
    payload: spotsObject,
  };
};

//Thunk
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const spots = await response.json();
  dispatch(getAllSpotsAction(spots.Spots));
  return response;
};

//Reducer function
const initialState = {spots: {}};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return Object.assign({ ...state, spots: action.payload });
      default:
        return state;
  }
};


export default spotReducer;


//Old code
//Action Creators
// export const getAllSpotsAction = (spots) => ({
//   type: LOAD_SPOTS,
//   payload: spots,
// });
