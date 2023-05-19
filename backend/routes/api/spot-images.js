// backend/routes/api/spot-images.js

const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');

// Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { imageId } = req.params;

    try {
      // Find the Spot Image
      const spotImage = await SpotImage.findByPk(imageId, {
        include: {
          model: Spot,
          attributes: ['ownerId']
        }
      });

      // Check if the Spot Image exists
      if (!spotImage) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
      }

      // Check if the Spot belongs to the current user
      if (spotImage.Spot.ownerId !== user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Delete the Spot Image
      await spotImage.destroy();

      // Return a success message
      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
