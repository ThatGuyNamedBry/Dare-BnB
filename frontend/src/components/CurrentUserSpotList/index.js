// frontend/src/components/CurrentUserSpotList/index.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAllSpotsThunk } from '../../store/spots';
import { Link } from 'react-router-dom';

const CurrentUserSpotList = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getCurrentUserAllSpotsThunk());
  }, [dispatch]);

  if (!spots || spots === null) {
    return <h1>No Spots showing, get to debugging!</h1>;
  }

  return (
    <ul id='SpotsGrid'>
      {Object.values(spots).map((spot) => (
        <li key={spot.id} title={spot.name}>
          <Link to={`/spots/${spot.id}`} name="spot-tile">
            <img src={spot.previewImage} alt={'Spot Thumbnail'} />
          </Link>
          <div>{spot.city}, {spot.state}</div>
          <div>${spot.price} night</div>
          <div>
            <i className="fa-sharp fa-solid fa-star"></i>
            {spot.avgRating || 'New'}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CurrentUserSpotList;
