import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createSpotThunk } from '../../store/spots';

const CreateSpotForm = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
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

        </div>
        <div>

        </div>
      </form>
    </div>
  );
};

export default CreateSpotForm;
