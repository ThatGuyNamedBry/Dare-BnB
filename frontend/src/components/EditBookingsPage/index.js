import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateBookingThunk, getBookingByIdThunk } from '../../store/bookings';
import './EditBookingsPage.css';

const EditBookingsPage = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getBookingByIdThunk(bookingId));
  }, [dispatch, bookingId]);

  const booking = useSelector((state) => state.bookings.singleBooking);

  useEffect(() => {
    if (booking && booking[bookingId]) {
      const formattedStartDate = booking[bookingId].startDate.split('T')[0];
      const formattedEndDate = booking[bookingId].endDate.split('T')[0];

      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
    }
  }, [booking, bookingId]);


  const handleBookingUpdate = async (e) => {
    e.preventDefault();

    const formData = { startDate, endDate };

    try {
      const data = await dispatch(updateBookingThunk(bookingId, formData));

      if (!data.errors) {
        history.push(`/manage-bookings`);
        alert('Booking updated successfully!');
      }
    } catch (error) {
      const errorData = await error.json();
      setErrors(errorData.errors);
    }
  };

  return (
    <div className='edit-bookings-container'>
      <h2>Edit your booking</h2>
      <form onSubmit={handleBookingUpdate}>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="submit">Update Booking</button>
      </form>
      <ul className="errors">
        {Object.values(errors).map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default EditBookingsPage;
