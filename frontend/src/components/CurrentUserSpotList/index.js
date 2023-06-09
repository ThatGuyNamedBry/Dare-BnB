// frontend/src/components/CurrentUserSpotList/index.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAllSpotsThunk } from '../../store/spots';
import { Link, useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const CurrentUserSpotList = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  const history = useHistory();

  useEffect(() => {
    dispatch(getCurrentUserAllSpotsThunk());
  }, [dispatch]);

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
            {spot.avgRating !== 0 ? spot.avgRating.toFixed(1) : 'New'}
          </div>
          <div id='UpdateDeleteButtons'>
            <button onClick={() => handleUpdate(spot)}>Update</button>
            <OpenModalButton
              modalComponent={<DeleteConfirmationModal spot={spot} />}
              buttonText="Delete"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CurrentUserSpotList;




//                             Old Code
// deletespotthunk moved to deleteconfirmationmodal
//   const handleDelete = (spot) => {
//     dispatch(deleteSpotThunk(spot.id))
//   };
