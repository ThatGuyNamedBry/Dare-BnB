// backend/routes/api/bookings.js

const express = require('express');
const router = express.Router();
const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req;

    try {
      const bookings = await Booking.findAll({
        where: {
          userId: user.id
        },
        include: [
          {
            model: Spot,
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
              'price',
              [Sequelize.literal('(SELECT "url" FROM "SpotImages" WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)'), 'previewImage']
            ]
          }
        ],
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
      });

      //Reorder the response
      const formattedBookings = bookings.map(booking => ({
        id: booking.id,
        spotId: booking.spotId,
        Spot: booking.Spot,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      }));

      res.status(200).json({ Bookings: formattedBookings });
    } catch (error) {
      return next(error);
    }
});

// Edit a booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;


    try {
      // Find the booking
      const booking = await Booking.findByPk(bookingId);

      // Check if the booking exists
      if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
      }

      // Check if the booking belongs to the current user
      if (booking.userId !== user.id) {
        return res.status(403).json({
            message: "Forbidden"
        });
      }

      // Check if the booking is in the past
      const currentDate = new Date();
      if (booking.endDate < currentDate) {
        return res.status(403).json({ message: "Past bookings can't be modified" });
      }

          // Check if there is a booking conflict
    const existingBooking = await Booking.findOne({
        where: {
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
      // Update the booking
      booking.startDate = startDate;
      booking.endDate = endDate;
      await booking.save();

      // Return the updated booking
      res.status(200).json({
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

  // Delete a booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const { user } = req;
    const { bookingId } = req.params;

    try {
      // Find the booking
      const booking = await Booking.findByPk(bookingId, {
        include: [{ model: Spot, attributes: ['ownerId'] }]
      });

      // Check if the booking exists
      if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
      }
      // Check if the booking or spot belongs to the current user
      if (booking.userId !== user.id && booking.Spot.ownerId !== user.id) {
        return res.status(403).json({
            message: "Forbidden"
        });
      }
      // Check if the booking belongs to the current user or the associated spot belongs to the current user
      if (booking.userId !== user.id && booking.Spot.ownerId !== user.id) {
        return res.status(403).json({ message: "You are not authorized to delete this booking" });
      }

      // Check if the booking has already started
      const currentDate = new Date();
      if (booking.startDate < currentDate) {
        return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
      }

      // Delete the booking
      await booking.destroy();

      // Return a success message
      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      return next(error);
    }
  });


module.exports = router;
