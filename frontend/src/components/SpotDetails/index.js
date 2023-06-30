// frontend/src/components/SpotDetails/index.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotByIdThunk } from '../../store/spots';
import { getReviewsBySpotIdThunk } from '../../store/reviews';
import ReviewModal from '../ReviewModal';
import { useModal } from "../../context/Modal";
import './SpotDetails.css';

const SpotDetails = () => {
  const { spotId, reviewId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot[spotId]);
  const allReviews = useSelector((state) => state.reviews.allReviews);
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
    setModalContent(<ReviewModal spotId={spotId} />); // Set the ReviewModal component as the modal content
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
            <div id='price'>${spot.price} night</div>
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
        {!Object.values(allReviews).length ? (
          <>
            <p>Be the first to post a review!</p>
            <button onClick={openReviewModal}>Leave a Review</button>
          </>
        ) : (
          <>
            <button onClick={openReviewModal}>Leave a Review</button>
            <ul>
              {Object.values(allReviews).map((review) => (
                <li key={review.id}>
                  <p>{review.User?.firstName}</p>
                  <p>{new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  <p>{review.comment}</p>
                  <p>Rating: {review.stars}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        {/* <div></div> */}
      </div>
    </div>

  );
};

export default SpotDetails;
