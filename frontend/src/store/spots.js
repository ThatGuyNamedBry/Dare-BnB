// frontend/src/store/spots.js
import { csrfFetch } from "./csrf";

//                                           Action Types
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT = 'spots/LOAD_SPOT';
const CREATE_SPOT = 'spots/CREATE_SPOT';

//                                         Action Creators

//Get All Spots Action
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

//Get Spot by ID Action
export const getSpotByIdAction = (spot) => {
  return {
    type: LOAD_SPOT,
    payload: spot,
  };
};

//Create Spot Action
export const createSpotAction = (spot) => {
  return {
    type: CREATE_SPOT,
    payload: spot,
  };
};


//                                             Thunks

//Get All Spots Thunk
export const getAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const spots = await response.json();
  dispatch(getAllSpotsAction(spots.Spots));
  return response;
};

//Get Spot by ID Thunk
export const getSpotByIdThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const spot = await response.json();
  dispatch(getSpotByIdAction(spot));
  return response;
};


//Reducer function
const initialState = {spots: {}};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, spots: action.payload };
    case LOAD_SPOT:
      return { ...state, spots: { ...state.spots, [action.payload.id]: action.payload } };
    case CREATE_SPOT:
      return {...state, spots: { ...state.spots, [action.payload.id]: action.payload }};
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
