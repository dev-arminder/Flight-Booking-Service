const express = require('express');
const router = express.Router();

const { BookingController } = require('../../controller');

router.post('/', BookingController.createBooking);

// Dummy Route For Payment 
router.post('/payments', BookingController.makePayment);

module.exports = router;