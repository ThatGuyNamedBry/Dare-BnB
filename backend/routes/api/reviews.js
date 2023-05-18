// backend/routes/api/reviews.js

const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    try {
      const reviews = await Review.findAll({
        where: {
          userId: user.id
        },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',
            [Sequelize.literal('(SELECT "url" FROM "SpotImages" WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)'), 'previewImage']]
          },
          {
            model: SpotImage,
            as: 'SpotImages',
            attributes: []
          }
        ]
      });

      res.status(200).json({ Reviews: reviews });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });


module.exports = router;
