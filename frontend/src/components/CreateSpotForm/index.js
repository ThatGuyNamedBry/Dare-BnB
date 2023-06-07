// frontend/src/components/CreateSpotForm/index.js
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createSpotThunk } from '../../store/spots';

const CreateSpotForm = (SpotImage) => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState(SpotImage?.url || '');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add Validators Here?

    dispatch(createSpotThunk({
      country,
      address,
      city,
      state,
      description,
      name,
      price,
      previewImage,
      image1,
      image2,
      image3,
      image4
    }))
  };

  return (
    <div>
      <h2>Create a New Spot</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Please write at least 30 characters' required/>
        </div>
        <div>
          <label>Name of your spot:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of your spot' required/>
        </div>
        <div>
          <label>Price per night (USD):</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price per night (USD)' required/>
        </div>
        <div>
          <label>Preview Image URL:</label>
          <input type="text" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} placeholder='Preview Image URL' required/>
        </div>
        <div>
          <label>Image 1 URL:</label>
          <input type="text" value={image1} onChange={(e) => setImage1(e.target.value)} placeholder='Image 1 URL'/>
        </div>
        <div>
          <label>Image 2 URL:</label>
          <input type="text" value={image2} onChange={(e) => setImage2(e.target.value)} placeholder='Image 2 URL'/>
        </div>
        <div>
          <label>Image 3 URL:</label>
          <input type="text" value={image3} onChange={(e) => setImage3(e.target.value)} placeholder='Image 3 URL'/>
        </div>
        <div>
          <label>Image 4 URL:</label>
          <input type="text" value={image4} onChange={(e) => setImage4(e.target.value)} placeholder='Image 4 URL'/>
        </div>
        <button type='submit'>Create Spot</button>
      </form>
    </div>
  );
};

export default CreateSpotForm;
