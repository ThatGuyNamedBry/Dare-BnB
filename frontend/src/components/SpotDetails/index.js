// frontend/src/components/SpotDetails/index.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotByIdThunk } from '../../store/spots';
import './SpotDetails.css';

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.allSpots[spotId]); //faster with allSpots?

  useEffect(() => {
    dispatch(getSpotByIdThunk(spotId));//Need to pass in spotId here to ensure the right spotId is passed into our Thunk
  }, [dispatch, spotId]);

  if (!spot || spot === null) {
    return <h1>Spot details loading...</h1>;
  }

  return (
    <div id='SpotDetailsContainer'>
      <h1 id='SpotName'>{spot.name}</h1>
      <h3 id='SpotLocation'>{spot.city}, {spot.state}, {spot.country}</h3>
      {spot.SpotImages?.map((image) => (
        <img key={image.id} src={image.url} alt="Spot Image" />
      ))}
      <div id='SDLeftContainer'>
        <div id ='HostedBy'>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</div>
        <div id ='SpotDescription'>{spot.description}</div>
      </div>
      <div id='SDRightContainer'>
      <div id ='price'>${spot.price} night</div>
      <button id ='ReserveBttn' onClick={() => alert('Feature coming soon')}>Reserve</button>
      </div>
    </div>
  );
};

export default SpotDetails;
