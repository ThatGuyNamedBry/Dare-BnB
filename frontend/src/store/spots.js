// frontend/src/store/spots.js
import { csrfFetch } from "./csrf";

//Action Types
const LOAD_SPOTS = 'spots/LOAD_SPOTS';

//Action Creators
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  payload: spots,
});

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const spots = await response.json();
  dispatch(loadSpots(spots.Spots));
};

//Reducer initilization and function
const initialState = {
  spots: [],
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, spots: action.payload };
    default:
      return state;
  }
};

export default spotReducer;
