// frontend/src/components/BookingsPage/index.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createBookingThunk } from '../../store/bookings';
import './BookingsPage.css';

const BookingsPage = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({});

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        const formData = { startDate, endDate };

        try {
            const data = await dispatch(createBookingThunk(spotId, formData));

            if (!data.errors) {
                history.push(`/spots/${spotId}`);
                alert('Booking successful!');
            }
        } catch (error) {
            const errorData = await error.json();
            setErrors(errorData.errors);
        }
    };

    return (
        <div className='bookings-container'>
            <h2>Book your stay</h2>
            <form onSubmit={handleBookingSubmit}>
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
                <button type="submit">Check Availability</button>
            </form>
            <ul className="errors">
                {/* {console.log('Errors:', errors)} */}
                {Object.values(errors).map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookingsPage;
