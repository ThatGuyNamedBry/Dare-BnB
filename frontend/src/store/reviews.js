// frontend/src/store/reviews.js
import { csrfFetch } from "./csrf";

// Action Types
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';

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
    dispatch(createReviewAction(review));
    return review;
  } else {
    const errorData = await response.json();
    return errorData;
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
    default:
      return state;
  }
};

export default reviewsReducer;
