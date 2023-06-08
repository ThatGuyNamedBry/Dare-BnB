// frontend/src/components/CurrentUserSpotList/index.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAllSpotsThunk, deleteSpotThunk } from '../../store/spots';
import { Link, useHistory } from 'react-router-dom';

const CurrentUserSpotList = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  const history = useHistory();

  useEffect(() => {
    dispatch(getCurrentUserAllSpotsThunk());
  }, [dispatch]);

  const handleDelete = (spot) => {
    dispatch(deleteSpotThunk(spot.id))
  };

  const handleUpdate = (spot) => {
    history.push(`/spots/${spot.id}/edit`);
  };

  if (!spots || spots === null) {
    return <h1>No Spots showing, try making one!</h1>;
  }

  return (
    <ul id='CurrentUserSpotsList'>
      <h1>Manage Spots</h1>
      <Link to="/spots/new">Create a New Spot</Link>
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
          <div id='UpdateDeleteButtons'>
            <button onClick={() => handleUpdate(spot)}>Update</button>
            <button onClick={() => handleDelete(spot)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CurrentUserSpotList;
