// backend/routes/api/spots.js

const express = require('express');
const router = express.Router();

const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');



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
    // Validations
    if (!address) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: { address: 'Street address is required' }
      });
    }
    if (!city) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: { city: 'City is required' }
      });
    }
    if (!state) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: { state: 'State is required' }
      });
    }
    if (!country) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: { country: 'Country is required' }
      });
    }
    if (!lat || isNaN(lat)) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: { lat: 'Latitude is not valid' }
      });
    }
    if (!lng || isNaN(lng)) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: { lng: 'Longitude is not valid' }
      });
    }
    if (!name || name.length > 50) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: { name: 'Name must be less than 50 characters' }
      });
    }
    if (!description) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: { description: 'Description is required' }
      });
    }
    if (!price) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: { price: 'Price per day is required' }
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

// Get details of a Spot by ID
router.get('/:id', async (req, res, next) => {
  const spotId = req.params.id;

  try {
    const spot = await Spot.findByPk(spotId, {
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
        [Sequelize.fn('COUNT', Sequelize.col('Reviews.id')), 'numReviews'],
        [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating']
      ],
      include: [
        {
          model: SpotImage,
          as: 'SpotImages',
          attributes: ['id', 'url', 'preview']
        },
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Review,
          as: 'Reviews',
          attributes: []
        }
      ]
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    const spotData = {
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
      updatedAt: spot.updatedAt,
      numReviews: spot.getDataValue('numReviews'),
      avgStarRating: spot.getDataValue('avgStarRating') || 0,
      SpotImages: spot.SpotImages,
      Owner: spot.Owner
    };

    return res.json(spotData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
