// backend/routes/api/reviews.js

const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
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
            model: ReviewImage,
            attributes: ['id', 'url']
          }
        ]
      });

      res.status(200).json({ Reviews: reviews });
    } catch (error) {
      return next(error);
    }
  });

// Add an Image to a Review
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { url } = req.body;
  const { user } = req;

  try {
// Find the review by its ID
const existingReview = await Review.findOne({
  where: {
    id: reviewId,
  }
});

// Check if the review exists
if (!existingReview) {
  res.status(404).json({
    message: "Review couldn't be found"
  });
  return;
}

// Check if the review belongs to the current user
if (existingReview.userId !== user.id) {
  res.status(403).json({
    message: "Forbidden"
  });
  return;
}

  // Check maximum number of images for the review
  const maxImages = 10;
  const imageCount = await ReviewImage.count({
    where: {
      reviewId
    }
  });

  if (imageCount >= maxImages) {
    res.status(403).json({
      message: 'Maximum number of images for this review was reached'
    });
    return;
  }

  // Create the new image
  const image = await ReviewImage.create({
    reviewId,
    url
  });

  res.status(200).json({
    id: image.id,
    url: image.url
  });
  } catch (error) {
    return next(error);
  }
});

// Edit a Review
router.put('/:reviewId', requireAuth, async (req, res) => {
  const { user } = req;
  const { reviewId } = req.params;
  const { review, stars } = req.body;

  try {
    // Find the review by its ID and ensure it belongs to the current user
    // Find the review by its ID
    const existingReview = await Review.findOne({
      where: {
        id: reviewId,
      }
    });

    // Check if the review exists
    if (!existingReview) {
      res.status(404).json({
        message: "Review couldn't be found"
      });
      return;
    }

    // Check if the review belongs to the current user
    if (existingReview.userId !== user.id) {
      res.status(403).json({
        message: "Forbidden"
      });
      return;
    }

    // Validate the review and stars
    if (!stars) {
      res.status(400).json({
        message: 'Bad Request',
        errors: {
          stars: 'Stars must be an integer from 1 to 5'
        }
      });
      return;
    }
    if (!review) {
      res.status(400).json({
        message: 'Bad Request',
        errors: {
          review: 'Review text is required'
        }
      });
      return;
    }

    // Update the review with the provided data
    existingReview.review = review;
    existingReview.stars = stars;
    await existingReview.save();

    // Needed to correct the response field order
    const updatedReview = await Review.findOne({
      where: {
        id: reviewId
      },
      attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt']
    });


    res.status(200).json(updatedReview);
  } catch (error) {
    return next(error);
  }
});

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const { user } = req;
  const { reviewId } = req.params;

  try {
    // Find the review by its ID
    const existingReview = await Review.findOne({
      where: {
        id: reviewId,
      }
    });

    // Check if the review exists
    if (!existingReview) {
      res.status(404).json({
        message: "Review couldn't be found"
      });
      return;
    }

    // Check if the review belongs to the current user
    if (existingReview.userId !== user.id) {
      res.status(403).json({
        message: "Forbidden"
      });
      return;
    }

    // Delete the review
    await existingReview.destroy();

    res.status(200).json({
      message: "Successfully deleted"
    });
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
