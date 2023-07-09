import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpotThunk, getSpotByIdThunk } from '../../store/spots';
import { useHistory, useParams } from 'react-router-dom';
import '../CreateSpotForm/CreateSpotForm.css';

const UpdateSpotForm = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot[spotId]);
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState({});
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [lat, setLat] = useState(100);
  const [lng, setLng] = useState(100);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [validationObject, setValidationObject] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!spot) {
        await dispatch(getSpotByIdThunk(spotId));
      } else {
        setCountry(spot.country);
        setAddress(spot.address);
        setCity(spot.city);
        setState(spot.state);
        setLat(spot.lat);
        setLng(spot.lng);
        setDescription(spot.description);
        setName(spot.name);
        setPrice(spot.price);
      }
    };

    fetchData();
  }, [dispatch, spot, spotId]);

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

    setValidationObject(errorsObject);

    if (Object.keys(errorsObject).length > 0) {
      return; // Prevents API call if errors are present
    }

    const formData = {
      id: spotId,
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

    const data = await dispatch(updateSpotThunk(formData));

    if (!data.validationObject) {
      history.push(`/spots/${data.id}`);
    } else {
      setValidationObject(data.validationObject);
    }
  };

  return (
    <div id='CreateSpotForm'>
      <h2>Update Your Spot</h2>
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
        <div id='SubmitBttnDiv'>
          <button id='CreateASpotSubmitBttn' type="submit">Update Spot</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSpotForm;
