// frontend/src/store/spots.js
import { csrfFetch } from "./csrf";

//                                           Action Types
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT = 'spots/LOAD_SPOT';
const CREATE_SPOT = 'spots/CREATE_SPOT';

//                                         Action Creators

//Get All Spots Action
export const getAllSpotsAction = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots,
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

//Create a Spot Thunk
export const createSpotThunk = (payload) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const spot = await response.json();
  dispatch(createSpotAction(spot));
  return response;
};


//Reducer function
const initialState = {
  allSpots: {},
  singleSpot: {}
}

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const allSpotsObject = {};
      action.payload.forEach((spot) => {
        allSpotsObject[spot.id] = spot;
      });
      return { ...state, allSpots: allSpotsObject };
      case LOAD_SPOT:
        return { ...state, singleSpot: {[action.payload.id]: action.payload} };
        case CREATE_SPOT:
          return {...state, allSpots: { [action.payload.id]: action.payload }};
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

    // const initialState = {spots: {}};
