// frontend/src/store/spots.js
import { csrfFetch } from "./csrf";

//                                           Action Types
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT = 'spots/LOAD_SPOT';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';


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


// Edit/Update a Spot Action
export const updateSpotAction = (spot) => {
  return {
    type: UPDATE_SPOT,
    payload: spot,
  };
};

//Delete a Spot Action
export const deleteSpotAction = (spotId) => {
  return {
    type: DELETE_SPOT,
    payload: spotId,
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

//Get All Spots by Current User Thunk
export const getCurrentUserAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current');
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
export const createSpotThunk = (formData) => async (dispatch) => {
  console.log('Create spot thunk running, this is the formData', formData)
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  console.log('After csrf fetch, this is the response', response)
  if (response.ok) {
    const spot = await response.json();
    console.log('If response is okay running, this is spot', spot)
    for (const image of formData.images) {
      if (image.url) {
        await dispatch(createImageforSpotThunk(spot, image));
      }
    }
    return spot;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

//Create Spot Image Thunk
export const createImageforSpotThunk = (spot, images) => async (dispatch) => {
  console.log('Create Image for Spot Thunk, this is spot and image ', spot, images)
  const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(images),
  });
  if (response.ok) {
    const newImage = await response.json();
    console.log('THIS IS NEW IMAGE RESPONSE', newImage)
    spot.previewImage = newImage.url;
    dispatch(createSpotAction(spot));
    return newImage;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

//Edit/Update a Spot Thunk
export const updateSpotThunk = (spot) => async (dispatch) => {
  // console.log('Edit/Update a Spot Thunk, this is spot  ', spot);
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(updateSpotAction(spot));
    return spot;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

//Delete a Spot Thunk
export const deleteSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteSpotAction(spotId));
    return response;
  }
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
      return { ...state, singleSpot: {[action.payload.id]: action.payload}};
    case CREATE_SPOT:
      return {...state, allSpots: {  ...state.allSpots, [action.payload.id]: action.payload }};
    case UPDATE_SPOT:
      return {...state, singleSpot: { [action.payload.id]: action.payload}};
    case DELETE_SPOT:
      const newSpots = { ...state.allSpots };
      delete newSpots[action.payload];
      return { ...state, allSpots: newSpots };
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

        // Create Spot Image Action
        // export const createSpotImageAction = (image) => {
          //   return {
            //     type: CREATE_SPOT_IMAGE,
            //     payload: image,
            //   };
            // };

            //return { ...state, singleSpot: { ...state.singleSpot, [action.payload.id]: action.payload }};
