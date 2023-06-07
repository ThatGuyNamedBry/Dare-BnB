// frontend/src/components/CreateSpotForm/index.js
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createSpotThunk } from '../../store/spots';
import './CreateSpotForm.css';

const CreateSpotForm = ({spot}) => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [lat, setlat] = useState(100 || '');
  const [lng, setlng] = useState(110 || '');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState(spot?.previewImage || '');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add Validators/UseEffect Here

    dispatch(createSpotThunk({}))
  };

  return (
    <div>
      <h2>Create a New Spot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Where's your place located?</h3>
          <p>Guests will only get your exact address once they booked a reservation.</p>
          <label>Country:</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' required/>
        </div>
        <div>
          <label>Street Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' required/>
        </div>
        <div>
          <label>City:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' required/>
        </div>
        <div>
          <label>State:</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder='State' required/>
        </div>
        <div id='DescriptionDiv'>
            <h3>Describe your place to guests</h3>
            <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Please write at least 30 characters' required/>
        </div>
        <div id='SpotNameDiv'>
          <h3>Create a title for your spot</h3>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of your spot' required/>
        </div>
        <div id='PriveDiv'>
          <h3>Set a base price for your spot</h3>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <label>$ </label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price per night (USD)' required/>
        </div>
        <div id='ImageDiv'>
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input type="text" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} placeholder='Preview Image URL' required/>
          <input type="text" value={image1} onChange={(e) => setImage1(e.target.value)} placeholder='Image 1 URL'/>
          <input type="text" value={image2} onChange={(e) => setImage2(e.target.value)} placeholder='Image 2 URL'/>
          <input type="text" value={image3} onChange={(e) => setImage3(e.target.value)} placeholder='Image 3 URL'/>
          <input type="text" value={image4} onChange={(e) => setImage4(e.target.value)} placeholder='Image 4 URL'/>
        </div>
        <button type='submit'>Create Spot</button>
      </form>
    </div>
  );
};

export default CreateSpotForm;
