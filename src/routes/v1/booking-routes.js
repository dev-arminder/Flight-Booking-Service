const express = require('express');
const router = express.Router();

const { BookingController } = require('../../controller');

router.post('/', BookingController.createBooking)

module.exports = router;