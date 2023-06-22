// frontend/src/store/reviews.js
import { csrfFetch } from "./csrf";

//                           Action Types
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const LOAD_REVIEW = 'reviews/LOAD_REVIEW';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';


//                         Action Creators

//Get All Reviews Action
export const loadReviewsAction = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    payload: reviews,
  };
};

//Get Review by ID Action
export const getReviewByIdAction = (review) => {
  return {
    type: LOAD_REVIEW,
    payload: review,
  };
};

//Create Review Action
export const createReviewAction = (review) => {
  return {
    type: CREATE_REVIEW,
    payload: review,
  };
};

//Delete a Review Action
export const deleteSpotAction = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId,
  };
};

//                              Thunks

//Get All Reviews by SpotId
export const getReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const reviews = await response.json();
  dispatch(loadReviewsAction(reviews));
  return response;
};

//Create a Review Thunk
export const createReviewThunk = (spotId, formData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(createReviewAction(review));
    return review;
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

// Reducer
const initialState = {
  allReviews: {},
  singleReview: {}
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const allReviewsObject = {};
      action.payload.Reviews.forEach((review) => {
        allReviewsObject[review.id] = review;
      });
      return { ...state, allReviews: allReviewsObject };
    case CREATE_REVIEW:
      return { ...state, allReviews: { ...state.allReviews, [action.payload.id]: action.payload } };
    case DELETE_REVIEW:
      const newReviews = { ...state.allReviews };
      delete newReviews[action.payload];
      return { ...state, allReviews: newReviews };
    default:
      return state;
  }
};

export default reviewsReducer;
