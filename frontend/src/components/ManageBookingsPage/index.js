import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAllBookingsThunk } from '../../store/bookings';
import { Link } from 'react-router-dom';
import './ManageBookingsPage.css';

const ManageBookingsPage = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.allBookings);

  useEffect(() => {
    dispatch(getCurrentUserAllBookingsThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Manage Bookings</h1>
      <ul id='ManageBookingsList'>
        {Object.values(bookings).map((booking) => (
          <li key={booking.id}>
            <Link to={`/spots/${booking.Spot.id}`} name="booking-tile">
              <img src={booking.Spot.previewImage} alt={'Spot Thumbnail'} />
            </Link>
            <div>{booking.Spot.name}</div>
            <div>Start Date: {booking.startDate}</div>
            <div>End Date: {booking.endDate}</div>
            <div>Booking Price: {/* Calculate booking price based on your logic */}</div>
            <div id='UpdateDeleteButtons'>
              {/* Update button */}
              <Link to={`/bookings/${booking.id}/edit`}>
                <button>Update</button>
              </Link>
              {/* Delete button */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBookingsPage;
