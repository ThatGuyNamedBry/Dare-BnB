// frontend/src/components/DeleteConfirmationModal/index.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSpotThunk } from '../../store/spots';
import { useModal } from '../../context/Modal';
import { deleteBookingThunk } from '../../store/bookings';

const DeleteConfirmationModal = ({ type, spot, booking }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    if (type === 'spot') {
      dispatch(deleteSpotThunk(spot.id));
      closeModal();
    } else if (type === 'booking') {
      dispatch(deleteBookingThunk(booking.id));
      closeModal();
    } else {
      closeModal();
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div id='DeleteConfirmationDiv'>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this {type} from your listings?</p>
      <button id='YesBttn' onClick={handleDelete}>Yes (Delete {type})</button>
      <button id='NoBttn' onClick={handleCancel}>No (Keep {type})</button>
    </div>
  );
};

export default DeleteConfirmationModal;
