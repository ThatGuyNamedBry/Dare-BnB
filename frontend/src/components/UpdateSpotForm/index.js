// frontend/src/components/UpdateSpotForm/index.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSpotThunk } from '../../store/spots';
// import './UpdateSpotForm.css';
import { useHistory } from 'react-router-dom';

const UpdateSpotForm = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [country, setCountry] = useState(spot?.country || '');
  const [address, setAddress] = useState(spot?.address || '');
  const [city, setCity] = useState(spot?.city || '');
  const [state, setState] = useState(spot?.state || '');
  const [lat, setLat] = useState(spot?.lat || 100 || '');
  const [lng, setLng] = useState(spot?.lng || 100 || '');
  const [description, setDescription] = useState(spot?.description || '');
  const [name, setName] = useState(spot?.name || '');
  const [price, setPrice] = useState(spot?.price || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      country,
      address,
      city,
      state,
      lat,
      lng,
      description,
      name,
      price,
    };

    try {
      const data = await dispatch(updateSpotThunk(formData));
      console.log('update a spot data ', data)
      if (!data.errors) {
        history.push(`/spots/${data.id}`);
      } else {
        setErrors(data.errors);
      }
    } catch (errors) {
      console.error('An error occurred while updating the spot:', errors);
    }
  };

  return (
    <div>
      <h2>Update Your Spot</h2>
      <form onSubmit={handleSubmit}>
        <div id='LocationDiv'>
          <h3>Where's your place located?</h3>
          <p>Guests will only get your exact address once they booked a reservation.</p>
          <label>Country:</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' required />
          <label>Street Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' required />
          <div id='CityStateInnerDiv'>
            <label>City:</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' required />
            <span>,</span>
            <label>State:</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder='STATE' required />
          </div>
        </div>
        <div id='DescriptionDiv'>
          <h3>Describe your place to guests</h3>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Please write at least 30 characters' required />
        </div>
        <div id='SpotNameDiv'>
          <h3>Create a title for your spot</h3>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of your spot' required />
        </div>
        <div id='PriceDiv'>
          <h3>Set a base price for your spot</h3>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div>
            <label>$ </label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price per night (USD)' required />
          </div>
        </div>
        <button type="submit">Update Spot</button>
      </form>
    </div>
  );
};

export default UpdateSpotForm;
