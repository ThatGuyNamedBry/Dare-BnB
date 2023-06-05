// frontend/src/components/SpotList/index.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import './SpotList.css';

const SpotList = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (!spots) {
    return <h1>No Spots showing, get to debugging!</h1>;
  }
  console.log(spots);
  return (
    <ul id = 'SpotsGrid'>
      {spots.map((spot) => (
        <li key={spot.id} title={spot.name}>
          <Link to={`/spots/${spot.id}`} name="spot-tile">
          <img src={spot.previewImage.url} alt={'Spot Image Thumbnail'} />
          <div>{spot.city}, {spot.state}</div>
          <div>{spot.price} night</div>
          <div>{spot.avgRating? spot.avgRating : 'New'}</div>
          {/* <div>{spot.name}</div> */}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SpotList;
