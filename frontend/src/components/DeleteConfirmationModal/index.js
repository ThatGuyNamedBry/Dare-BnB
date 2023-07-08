// frontend/src/components/DeleteConfirmationModal/index.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSpotThunk } from '../../store/spots';
import { useModal } from '../../context/Modal';

const DeleteConfirmationModal = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteSpotThunk(spot.id));
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div id='DeleteConfirmationDiv'>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button id='YesBttn' onClick={handleDelete}>Yes (Delete Spot)</button>
      <button id='NoBttn' onClick={handleCancel}>No (Keep Spot)</button>
    </div>
  );
};

export default DeleteConfirmationModal;
