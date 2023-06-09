// frontend/src/store/reviews.js
import { csrfFetch } from "./csrf";

// Action Types
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';

// Action Creators
export const loadReviewsAction = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    payload: reviews,
  };
};

export const addReviewAction = (review) => {
  return {
    type: ADD_REVIEW,
    payload: review,
  };
};

// Thunks
export const getReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const reviews = await response.json();
  dispatch(loadReviewsAction(reviews));
  return response;
};

export const createReviewThunk = (spotId, formData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(addReviewAction(review));
    return review;
  } else {
    const errorData = await response.json();
    return errorData;
  }
};

// Reducer
const initialState = {
  reviews: {},
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const allReviewsObject = {};
      action.payload.forEach((review) => {
        allReviewsObject[review.id] = review;
      });
      return { ...state, reviews: allReviewsObject };
    case ADD_REVIEW:
      return { ...state, reviews: { ...state.reviews, [action.payload.id]: action.payload } };
    default:
      return state;
  }
};

export default reviewsReducer;

