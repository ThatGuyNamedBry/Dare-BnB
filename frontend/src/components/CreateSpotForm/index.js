import React, { useState } from 'react';

const CreateSpotForm = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset form fields after submission
    setAddress('');
    setCity('');
    setState('');
    setCountry('');
    setName('');
    setPrice('');
    setDescription('');
    setPreviewImage('');
    setImage1('');
    setImage2('');
    setImage3('');
    setImage4('');
  };

  return (
    <div>
      <h2>Create a New Spot</h2>
      <form onSubmit={handleSubmit}>
      </form>
    </div>
  );
};

export default CreateSpotForm;
