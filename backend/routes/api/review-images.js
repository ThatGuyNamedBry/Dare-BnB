// backend/routes/api/review-images.js

const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking  } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { imageId } = req.params;

    try {
      // Find the Review Image and include the Review object
      const reviewImage = await ReviewImage.findByPk(imageId, {
        include: {
          model: Review,
          attributes: ['userId']
        }
      });

      // Check if the Review Image exists
      if (!reviewImage) {
        return res.status(404).json({ message: "Review Image couldn't be found" });
      }

      // Check if the Review belongs to the current user
      if (reviewImage.Review.userId !== user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Delete the Review Image
      await reviewImage.destroy();

      // Return a success message
      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
