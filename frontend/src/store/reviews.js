// frontend/src/store/reviews.js
import { csrfFetch } from "./csrf";

// Action Types
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

// Action Creators
export const loadReviewsAction = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    payload: reviews,
  };
};

export const createReviewAction = (review) => {
  return {
    type: CREATE_REVIEW,
    payload: review,
  };
};

//Delete a Review Action
export const deleteSpotAction = (reviewId) => {
  return {
    type: DELETE_SPOT,
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
  reviews: {}
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const allReviewsObject = {};
      action.payload.Reviews.forEach((review) => {
        allReviewsObject[review.id] = review;
      });
      return { ...state, reviews: allReviewsObject };
    case CREATE_REVIEW:
      return { ...state, reviews: { ...state.reviews, [action.payload.id]: action.payload } };
    case DELETE_REVIEW:
      const newReviews = { ...state.reviews };
      delete newReviews[action.payload];
      return { ...state, reviews: newReviews };
    default:
      return state;
  }
};

export default reviewsReducer;
