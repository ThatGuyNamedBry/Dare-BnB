// frontend/src/components/CreateSpotForm/index.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { createSpotThunk } from '../../store/spots';
import './CreateSpotForm.css';
import { useHistory } from 'react-router-dom';

const CreateSpotForm = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [lat, setLat] = useState(100 || '');
  const [lng, setLng] = useState(110 || '');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState(spot?.previewImage || '');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [validationObject, setValidationObject] = useState({});



  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorsObject = {};
    if (!country) {
      errorsObject.country = 'Country is required';
    }

    if (!address) {
      errorsObject.address = 'Address is required';
    }

    if (!city) {
      errorsObject.city = 'City is required';
    }

    if (!state) {
      errorsObject.state = 'State is required';
    }

    if (description.length < 30) {
      errorsObject.description = 'Description needs a minimum of 30 characters';
    }

    if (!name) {
      errorsObject.name = 'Name is required';
    }

    if (!price) {
      errorsObject.price = 'Price is required';
    }

    if (!previewImage) {
      errorsObject.previewImage = 'Preview image is required';
    } else if (!previewImage.match(/\.(png|jpg|jpeg)$/i)) {
      errorsObject.previewImage = 'Image URL must end in .png, .jpg, or .jpeg';
    }

    if (image1 && !image1.match(/\.(png|jpg|jpeg)$/i)) {
      errorsObject.image1 = 'Image URL must end in .png, .jpg, or .jpeg';
    }

    if (image2 && !image2.match(/\.(png|jpg|jpeg)$/i)) {
      errorsObject.image2 = 'Image URL must end in .png, .jpg, or .jpeg';
    }
    if (image3 && !image3.match(/\.(png|jpg|jpeg)$/i)) {
      errorsObject.image3 = 'Image URL must end in .png, .jpg, or .jpeg';
    }
    if (image4 && !image4.match(/\.(png|jpg|jpeg)$/i)) {
      errorsObject.image4 = 'Image URL must end in .png, .jpg, or .jpeg';
    }

    setValidationObject(errorsObject);

    if (Object.keys(errorsObject).length === 0) {
      const images = [
        { url: previewImage, preview: true },
        { url: image1, preview: false },
        { url: image2, preview: false },
        { url: image3, preview: false },
        { url: image4, preview: false }
      ];

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
        images
      };

      const data = await dispatch(createSpotThunk(formData));
      // console.log('create a spot data ', data)
      if (!data.validationObject) {
        history.push(`/spots/${data.id}`)
      } else {
        setValidationObject(data.validationObject);
      }
    }
  };

  return (
    <div id='CreateSpotForm'>
      <h2>Create a New Spot</h2>
      <form onSubmit={handleSubmit}>
      <div id='LocationDiv'>
          <h3>Where's your place located?</h3>
          <p>Guests will only get your exact address once they booked a reservation.</p>
          <div className='location-field'>
            <div className='field-input'>
              <label>Country</label>
              {validationObject.country && <p className="error">{validationObject.country}</p>}
            </div>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' />
          </div>
          <div className='location-field'>
            <div className='field-input'>
              <label>Street Address</label>
              {validationObject.address && <p className="error">{validationObject.address}</p>}
            </div>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
          </div>
          <div id='CityNStateDiv'>
          <div className='location-field'>
            <div id='CityDiv'>
              <div className='field-input'>
                <label>City</label>
                {validationObject.city && <p className="error">{validationObject.city}</p>}
              </div>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' />
              <span> , </span>
            </div>
          </div>
          <div className='location-field'>
            <div id='StateDiv'>
              <div className='field-input'>
                <label>State</label>
                {validationObject.state && <p className="error">{validationObject.state}</p>}
              </div>
              <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder='STATE' />
            </div>
          </div>
          </div>
        </div>
        <div id='DescriptionDiv'>
          <h3>Describe your place to guests</h3>
          <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Please write at least 30 characters' />
          {validationObject.description && <p className="error">{validationObject.description}</p>}
        </div>
        <div id='SpotNameDiv'>
          <h3>Create a title for your spot</h3>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of your spot' />
          {validationObject.name && <p className="error">{validationObject.name}</p>}
        </div>
        <div id='PriceDiv'>
          <h3>Set a base price for your spot</h3>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div>
            <label>$ </label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price per night (USD)' />
            {validationObject.price && <p className="error">{validationObject.price}</p>}
          </div>
        </div>
        <div id='ImageDiv'>
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input type="text" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} placeholder='Preview Image URL' />
          {validationObject.previewImage && <p className="error">{validationObject.previewImage}</p>}
          <input type="text" value={image1} onChange={(e) => setImage1(e.target.value)} placeholder='Image URL' />
          {validationObject.image1 && <p className="error">{validationObject.image1}</p>}
          <input type="text" value={image2} onChange={(e) => setImage2(e.target.value)} placeholder='Image URL' />
          {validationObject.image2 && <p className="error">{validationObject.image2}</p>}
          <input type="text" value={image3} onChange={(e) => setImage3(e.target.value)} placeholder='Image URL' />
          {validationObject.image3 && <p className="error">{validationObject.image3}</p>}
          <input type="text" value={image4} onChange={(e) => setImage4(e.target.value)} placeholder='Image URL' />
          {validationObject.image4 && <p className="error">{validationObject.image4}</p>}
        </div>
        <div id='SubmitBttnDiv'>
          <button id='CreateASpotSubmitBttn' type='submit'>Create Spot</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSpotForm;

/*                                     Old code                                                      */
// const data = await dispatch(createSpotThunk(formData));
// console.log('create a spot data ', data)
// if (!data.validationObject) {
  //   history.push(`/spots/${data.id}`)
  // } else {
    //   setValidationObject(validationObject.errors);
// }

    // useEffect(() => {
    //   const errorsObject = {};
    //   if (!country) {
      //     errorsObject.country = 'Country is required';
      //   }

    //   if (!address) {
    //     errorsObject.country = 'Address is required';
    //   }

    //   if (!city) {
      //     errorsObject.city = 'City is required';
    //   }

    //   setValidationObject(errorsObject);
    // }, [country, address, city, state, description, name, price, previewImage]);


        // if (previewImage || image1 || image2 || image3 || image4) {
        //   errorsObject.previewImage = 'Image URL must end in .png, .jpg, or .jpeg';
        //   errorsObject.image1 = 'Image URL must end in .png, .jpg, or .jpeg';
        //   errorsObject.image2 = 'Image URL must end in .png, .jpg, or .jpeg';
        //   errorsObject.image3 = 'Image URL must end in .png, .jpg, or .jpeg';
        //   errorsObject.image4 = 'Image URL must end in .png, .jpg, or .jpeg';
        // }
