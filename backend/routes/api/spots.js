// backend/routes/api/spots.js

const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// Get all Spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    attributes: [
      'id',
      'ownerId',
      'address',
      'city',
      'state',
      'country',
      'lat',
      'lng',
      'name',
      'description',
      'price',
      'createdAt',
      'updatedAt',
      'avgRating',
      'previewImage'
    ]
  });

  return res.json({
    Spots: spots
  });
});

// Create a Spot
router.post('/', requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const ownerId = req.user.id;

  try {
    // Perform validation on the request body
    if (!address || !city || !state || !country || !lat || isNaN(lat) || !lng || isNaN(lng) || !name || name.length > 50 || !description || !price) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: {
          address: !address && 'Street address is required',
          city: !city && 'City is required',
          state: !state && 'State is required',
          country: !country && 'Country is required',
          lat: (!lat || isNaN(lat)) && 'Latitude is not valid',
          lng: (!lng || isNaN(lng)) && 'Longitude is not valid',
          name: (!name || name.length > 50) && 'Name must be less than 50 characters',
          description: !description && 'Description is required',
          price: !price && 'Price per day is required'
        }
      });
    }

    const spot = await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });

    return res.status(201).json({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt
    });
  } catch (error) {
    return next(error);
  }
});


// Get all Spots owned by the Current User
router.get('/owned', requireAuth, async (req, res) => {
  const ownerId = req.user.id;

  const spots = await Spot.findAll({
    where: {
      ownerId
    },
    attributes: [
      'id',
      'ownerId',
      'address',
      'city',
      'state',
      'country',
      'lat',
      'lng',
      'name',
      'description',
      'price',
      'createdAt',
      'updatedAt',
      'avgRating',
      'previewImage'
    ]
  });

  return res.json({
    Spots: spots
  });
});

module.exports = router;
