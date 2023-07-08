// frontend/src/components/DeleteReviewConfirmationModal/index.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import './DeleteReviewConfirmationModal.css';

const DeleteReviewConfirmationModal = ({ review }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = () => {
    dispatch(deleteReviewThunk(review.id));
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div id='DeleteConfirmationDiv'>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <button id='YesBttn' onClick={handleDelete}>Yes (Delete Review)</button>
      <button id='NoBttn' onClick={handleCancel}>No (Keep Review)</button>
    </div>
  );
};

export default DeleteReviewConfirmationModal;
