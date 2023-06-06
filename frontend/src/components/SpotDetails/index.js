import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetailsThunk } from '../../store/spots';
import './SpotDetails.css';

const SpotDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpotDetailsThunk());
  }, [dispatch]);

  return (
    <div className="spot-details">
    </div>
  );
};

export default SpotDetails;
