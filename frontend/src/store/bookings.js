// frontend/src/store/bookings.js
import { csrfFetch } from "./csrf";

// Action Types
const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS';
const LOAD_BOOKING = 'spots/LOAD_BOOKING';
const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';

// Action Creators
export const getBookingsAction = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
        payload: bookings,
    };
};

export const getBookingByIdAction = (booking) => {
    return {
        type: LOAD_BOOKING,
        payload: booking,
    };
};

export const createBookingAction = (booking) => {
    return {
        type: CREATE_BOOKING,
        payload: booking,
    };
};

export const updateBookingAction = (booking) => {
    return {
        type: UPDATE_BOOKING,
        payload: booking,
    };
};

export const deleteBookingAction = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        payload: bookingId,
    };
};

//                                  Thunks
//Get All Bookings Thunk
export const getAllBookingsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
    const bookings = await response.json();
    dispatch(getBookingsAction(bookings.Bookings));
    return response;
};

//Get All Bookings by Current User Thunk
export const getCurrentUserAllBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current');
    const bookings = await response.json();
    dispatch(getBookingsAction(bookings.Bookings));
    return response;
};

//Get Booking by ID Thunk
export const getBookingByIdThunk = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`);
    const booking = await response.json();
    dispatch(getBookingByIdAction(booking));
    return response;
};

//Create Booking Thunk
export const createBookingThunk = (spotId, formData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        const newBooking = await response.json();
        return dispatch(createBookingAction(newBooking));
        // return newBooking;
    } else {
        const errorData = await response.json();
        return errorData;
    }
};

// Update Booking Thunk
export const updateBookingThunk = (bookingId, formData) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        const updatedBooking = await response.json();
        return dispatch(updateBookingAction(updatedBooking));
        // return updatedBooking;
    } else {
        const errorData = await response.json();
        return errorData;
    }
};

// Delete Booking Thunk
export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteBookingAction(bookingId));
        return response;
    }
};

// Reducer function
const initialState = {
    allBookings: {},
    singleBooking: {},
};

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKINGS:
            const allBookingsObject = {};
            action.payload.forEach((booking) => {
                allBookingsObject[booking.id] = booking;
            });
            return { ...state, allBookings: allBookingsObject };
        case LOAD_BOOKING:
            return { ...state, singleBooking: {[action.payload.id]: action.payload }};
        case CREATE_BOOKING:
            return { ...state, allBookings: { ...state.allBookings, [action.payload.id]: action.payload } };
        case UPDATE_BOOKING:
            return { ...state, allBookings: { ...state.allBookings, [action.payload.id]: action.payload } };
        case DELETE_BOOKING:
            const newBookings = { ...state.allBookings };
            delete newBookings[action.payload];
            return { ...state, allBookings: newBookings };
        default:
            return state;
    }
};

export default bookingsReducer;
