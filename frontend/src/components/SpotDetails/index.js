// frontend/src/components/SpotDetails/index.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotByIdThunk } from '../../store/spots';
import { getReviewsBySpotIdThunk } from '../../store/reviews';
import ReviewModal from '../ReviewModal';
import { useModal } from "../../context/Modal";
import './SpotDetails.css';
import DeleteReviewConfirmationModal from '../DeleteReviewConfirmationModal';

const SpotDetails = () => {
  const { spotId, reviewId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot[spotId]);
  const allReviews = useSelector((state) => state.reviews.allReviews);
  const currentUser = useSelector((state) => state.session.user);
  // const review = useSelector((state) => state.reviews.singleReview[reviewId]); //Probably do not need as no update crud is required
  const { setModalContent } = useModal();

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId));
    dispatch(getReviewsBySpotIdThunk(spotId));
  }, [dispatch, spotId]);

  if (!spot || spot === null) {
    return <h1>Loading...</h1>;
  }
  const openReviewModal = () => {
    setModalContent(<ReviewModal spotId={spotId} />);
  };

  const openDeleteConfirmationModal = (review) => {
    setModalContent(<DeleteReviewConfirmationModal review={review} />);
  };

  const hasPostedReview = (userId) => {
    return Object.values(allReviews).some(review => review.userId === userId);
  };

  const shouldShowReviewButton = () => {
    if (!currentUser || currentUser.id === spot.Owner?.id || hasPostedReview(currentUser.id)) {
      return false;
    }
    return true;
  };


  return (
    <div id='WholeSpotDetailsPage'>
      <div id='SpotDetailsContainer'>
        <div id='SpotInfo'>
          <h1 id='SpotName'>{spot.name}</h1>
          <h3 id='SpotLocation'>{spot.city}, {spot.state}, {spot.country}</h3>
        </div>
        <div id='ImagesContainer'>
          {spot.SpotImages?.map((image) => (
            <img key={image.id} src={image.url} alt="Spot Thumbnail Details" />
          ))}
        </div>
        <div id='HostedByDesc'>
          <div id='HostedBy'>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</div>
          <div id='SpotDescription'>{spot.description}</div>
        </div>
        <div id='ReserveBttnContainer'>
          <div id='AboveBttn'>
            <div id='price'><strong>${spot.price}</strong> night</div>
            <div id='ReserveBttnReviews'>
              <i className="fa-sharp fa-solid fa-star"></i>
              {spot.avgStarRating !== 0 ? spot.avgStarRating?.toFixed(1) : 'New'}
              {Object.values(allReviews).length !== 0 && (
                <>
                  <span className="dot"> · </span>
                  {Object.values(allReviews).length} {Object.values(allReviews).length === 1 ? 'review' : 'reviews'}
                </>
              )}
            </div>

          </div>
          <button id='ReserveBttn' onClick={() => alert('Feature coming soon')}>Reserve</button>
        </div>
      </div>
      <div id='SDReviewsContainer'>
        <div id='IconandRaitingDiv'>
          <i className="fa-sharp fa-solid fa-star"></i>
          {spot.avgStarRating !== 0 ? spot.avgStarRating?.toFixed(1) : 'New'}
          {Object.values(allReviews).length !== 0 && (
            <>
              <span className="dot"> · </span>
              <p>
                {Object.values(allReviews).length} {Object.values(allReviews).length === 1 ? 'review' : 'reviews'}
              </p>
            </>
          )}
        </div>
        {Object.values(allReviews).length === 0 ? (
          <>
            {currentUser && (
              <>
              <p>Be the first to post a review!</p>
              <button onClick={openReviewModal}>Post Your Review</button>
              </>
            )}
          </>
        ) : (
          <>
            {currentUser && shouldShowReviewButton() && (
              <button onClick={openReviewModal}>Post Your Review</button>
            )}
            <ul>
              {Object.values(allReviews).map((review) => (
                <li key={review.id}>
                  <p>{review.User?.firstName}</p>
                  <p>{new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  <p>{review.review}</p>
                  {review.userId === currentUser?.id && (
                    <button className='deleteReviewBttn' onClick={() => openDeleteConfirmationModal(review)}>Delete</button>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SpotDetails;
