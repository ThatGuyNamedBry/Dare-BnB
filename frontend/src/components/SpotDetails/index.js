// frontend/src/components/SpotDetails/index.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotByIdThunk } from '../../store/spots';
import { getReviewsBySpotIdThunk } from '../../store/reviews';
import './SpotDetails.css';

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.singleSpot[spotId]);
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId));
    dispatch(getReviewsBySpotIdThunk(spotId));//Need to pass in spotId here to ensure the right spotId is passed into our Thunk
  }, [dispatch, spotId]);

  if (!spot || spot === null) {
    return <h1>I am a turtle...</h1>;
  }

  return (
  <>
    <div id='SpotDetailsContainer'>
      <h1 id='SpotName'>{spot.name}</h1>
      <h3 id='SpotLocation'>{spot.city}, {spot.state}, {spot.country}</h3>
      {spot.SpotImages?.map((image) => (
        <img key={image.id} src={image.url} alt="Spot Thumbnail Details" />
      ))}
      <div id='SDLeftContainer'>
        <div id ='HostedBy'>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</div>
        <div id ='SpotDescription'>{spot.description}</div>
      </div>
      <div id='SDRightContainer'>
      <div id ='price'>${spot.price} night</div>
      <div>
        <i className="fa-sharp fa-solid fa-star"></i>
        {spot.avgStarRating !== 0 ? spot.avgStarRating?.toFixed(1) : 'New'}
      </div>
      <button id ='ReserveBttn' onClick={() => alert('Feature coming soon')}>Reserve</button>
      </div>
    </div>
    <div id='SDReviewsContainer'>
      <div id='IconandRaitingDiv'>
        <i className="fa-sharp fa-solid fa-star"></i>
        {spot.avgStarRating.toFixed(1)}
        <span className="dot"> · </span>
        <p>{Object.values(reviews).length} reviews</p>
      </div>
      {!Object.values(reviews) ? (
        <p>No reviews available. Create one!</p>
        ) : (
          <ul>
            {Object.values(reviews).map((review) => (
              <li key={review.id}>
                <p>{review.User.firstName}</p>
                <p>{review.review}</p>
                <p>Rating: {review.stars}</p>
              </li>
            ))}
          </ul>
        )}
      <div></div>
    </div>
  </>

  );
};

export default SpotDetails;
