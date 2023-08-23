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

  const lengthOfStay = (startDate, endDate) => {
    return Math.floor((new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000)) + 1;
  };

  const formatDateRange = (startDate, endDate) => {
    const formattedStartDate = new Date(startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const formattedEndDate = new Date(endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

    if (formattedStartDate === formattedEndDate) {
      return formattedStartDate;
    } else {
      return `${formattedStartDate} - ${formattedEndDate}`;
    }
  };

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
            <div>Date: {formatDateRange(booking.startDate, booking.endDate)}</div>
            <div>Length of stay: {lengthOfStay(booking.startDate, booking.endDate)} {lengthOfStay(booking.startDate, booking.endDate) === 1 ? 'day' : 'days'}</div>
            <div>Booking Cost: ${lengthOfStay(booking.startDate, booking.endDate) * booking.Spot.price}</div>
            <div id='UpdateDeleteButtons'>
              {/* Update button */}
              <Link to={`/bookings/${booking.id}/edit`}>
                <button>Update</button>
              </Link>
              {/* Delete button */}
              {/* <OpenModalButton
                modalComponent={<DeleteConfirmationModal booking={booking} />}
                buttonText="Delete"
              /> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBookingsPage;
