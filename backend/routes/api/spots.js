// backend/routes/api/spots.js

const express = require('express');
const router = express.Router();

const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
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
      'updatedAt'
    ],
    include: [
      {
        model: SpotImage,
        as: 'SpotImages',
        attributes: []
      }
    ]
  });

  // Retrieve additional data using lazy loading
  const spotIds = spots.map(spot => spot.id);

  const avgRatings = await Review.findAll({
    attributes: [
      [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating'],
      'spotId'
    ],
    where: {
      spotId: spotIds
    },
    group: 'spotId'
  });

  const previewImages = await SpotImage.findAll({
    attributes: [
      'url',
      'spotId'
    ],
    where: {
      spotId: spotIds,
      preview: true
    },
    group: 'spotId'
  });

  // Map the additional data to the respective spots
  const avgRatingsMap = {};
  avgRatings.forEach(rating => {
    avgRatingsMap[rating.spotId] = parseFloat(rating.dataValues.avgRating) || 0; // Convert to a number
  });

  const previewImagesMap = {};
  previewImages.forEach(image => {
    previewImagesMap[image.spotId] = image.url;
  });

  // Attach additional data to the spots
  spots.forEach(spot => {
    spot.dataValues.avgRating = avgRatingsMap[spot.id] || 0;
    spot.dataValues.previewImage = previewImagesMap[spot.id] || null;
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
router.get('/current', requireAuth, async (req, res) => {
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
      [Sequelize.literal('(SELECT COALESCE(AVG(stars), 0) FROM "Reviews" WHERE "Reviews"."spotId" = "Spot"."id")'), 'avgRating'],
      [Sequelize.literal('(SELECT "url" FROM "SpotImages" WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)'), 'previewImage']
    ]
  });

  return res.json({
    Spots: spots
  });
});

// Get details of a Spot by ID
router.get('/:spotId', async (req, res, next) => {
  const spotId = req.params.spotId;

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

    if (!spot || !spot.id) {
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

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const { url, preview } = req.body;

  try {
    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot || !spot.id) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    // Check if the current user is the owner of the spot
    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({
        message: 'Forbidden'
      });
    }

    // Create and add the image to the spot
    const image = await SpotImage.create({
      spotId,
      url,
      preview
    });

    return res.status(200).json({
      id: image.id,
      url: image.url,
      preview: image.preview
    });
  } catch (error) {
    return next(error);
  }
});

// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const ownerId = req.user.id;

  try {
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
    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot || !spot.id) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    // Check if the current user is the owner of the spot
    if (spot.ownerId !== ownerId) {
      return res.status(403).json({
        message: 'Forbidden'
      });
    }

    // Update the spot
    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();

    return res.status(200).json({
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

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const ownerId = req.user.id;

  try {
    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot || !spot.id) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    // Check if the current user is the owner of the spot
    if (spot.ownerId !== ownerId) {
      return res.status(403).json({
        message: 'Forbidden'
      });
    }

    // Delete the spot
    await spot.destroy();

    return res.status(200).json({
      message: 'Successfully deleted'
    });
  } catch (error) {
    return next(error);
  }
});

  // Get all Reviews by a Spot's id
  router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;

    try {
      const spot = await Spot.findByPk(spotId);

      if (!spot || !spot.id) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }

      const reviews = await Review.findAll({
        where: {
          spotId
        },
        include: [
          {
            model: User,
            as: 'User',
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: ReviewImage,
            as: 'ReviewImages',
            attributes: ['id', 'url']
          }
        ]
      });

      res.status(200).json({ Reviews: reviews });
    } catch (error) {
      return next(error);
    }
  });

  // Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const { review, stars } = req.body;
  const userId = req.user.id;

  try {
    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot || !spot.id) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }
    //Body validations
    if (!Number.isInteger(req.body.stars) || req.body.stars < 1 || req.body.stars > 5) {
      res.status(400).json({
        message: 'Bad Request',
        errors: {
          stars: 'Stars must be an integer from 1 to 5'
        }
      });
      return;
    }
    // Check if the user already has a review for the spot
    const existingReview = await Review.findOne({
      where: {
        spotId,
        userId
      }
    });
    if (existingReview) {
      return res.status(403).json({
        message: 'User already has a review for this spot'
      });
    }

    // Create and add the review to the spot
    const newReview = await Review.create({
      spotId,
      userId,
      review,
      stars
    });

    return res.status(201).json({
      id: newReview.id,
      userId: newReview.userId,
      spotId: newReview.spotId,
      review: newReview.review,
      stars: newReview.stars,
      createdAt: newReview.createdAt,
      updatedAt: newReview.updatedAt
    });
  } catch (error) {
    return next(error);
  }
});

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    const bookings = await Booking.findAll({
      where: {
        spotId
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    if (spot.ownerId === req.user.id) {
      // User is the owner of the spot
      const formattedBookings = bookings.map(booking => {
        return {
          User: booking.User,
          id: booking.id,
          spotId: booking.spotId,
          userId: booking.userId,
          startDate: booking.startDate,
          endDate: booking.endDate,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt
        };
      });

      return res.status(200).json({
        Bookings: formattedBookings
      });
    } else {
      // User is not the owner of the spot
      const formattedBookings = bookings.map(booking => {
        return {
          spotId: booking.spotId,
          startDate: booking.startDate,
          endDate: booking.endDate
        };
      });

      return res.status(200).json({
        Bookings: formattedBookings
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId;
  const { startDate, endDate } = req.body;
  const userId = req.user.id;

  try {
    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot || !spot.id) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    // Check if the spot belongs to the current user
    if (spot.ownerId === userId) {
      return res.status(403).json({
        message: 'Forbidden'
      });
    }

    // Handle endDate on or before startDate error
    if (endDate <= startDate) {
      return res.status(400).json({
        message: 'Bad Request',
        errors: { endDate: 'endDate cannot be on or before startDate' }
      });
    }

    // Check if there is a booking conflict
    const existingBooking = await Booking.findOne({
      where: {
        spotId,
        [Op.or]: [
          {
            startDate: {
              [Op.lte]: endDate
            },
            endDate: {
              [Op.gte]: startDate
            }
          },
          {
            startDate: {
              [Op.gte]: startDate
            },
            endDate: {
              [Op.lte]: endDate
            }
          }
        ]
      }
    });

    if (existingBooking) {
      return res.status(403).json({
        message: 'Sorry, this spot is already booked for the specified dates',
        errors: {
          startDate: 'Start date conflicts with an existing booking',
          endDate: 'End date conflicts with an existing booking'
        }
      });
    }


    // Create the booking
    const booking = await Booking.create({
      spotId,
      userId,
      startDate,
      endDate
    });

    return res.status(200).json({
      id: booking.id,
      spotId: booking.spotId,
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
