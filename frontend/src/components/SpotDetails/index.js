import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotByIdThunk } from '../../store/spots';

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.spots[spotId]);

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId));//Need to pass in spotId here to ensure the right spotId is passed into our Thunk
  }, [dispatch, spotId]);

  if (!spot || spot === null) {
    return <h1>No Spot details to display, get to debugging!</h1>;
  }

  return (
    <div>
      <h1>{spot.name}</h1>
      <h3>Location: {spot.city}, {spot.state}, {spot.country}</h3>
      {spot.SpotImages?.map((image) => (
        <img src={image.url} alt="Spot Image" />
      ))}
      <p>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</p>
      <p>{spot.description}</p>
      <div>
        <span>${spot.price} night</span>
        <button onClick={() => alert('Feature coming soon')}>Reserve</button>
      </div>
    </div>
  );
};

export default SpotDetails;
