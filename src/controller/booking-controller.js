const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { BookingService } = require('../services');

// Local Database - Need to use an entire table or redis in production uses.
const inMemDb = {}

async function createBooking(req, res) {
  try {
    const booking = await BookingService.createBooking({
      flightId: req.body.flightId,
      userId: req.body.userId,
      noOfSeats: req.body.noOfSeats
    });
    SuccessResponse.data = booking;
    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

async function makePayment(req, res){
  try {
    const idempotencyKey = req.headers['x-idempotency-key'];
    if (!idempotencyKey) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'idempotency key missing' });
    }
    if (inMemDb[idempotencyKey]) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Cannot retry on a successful payment' });
    } 
    const payment = await BookingService.makePayment({
      totalCost: req.body.totalCost,
      userId: req.body.userId,
      bookingId: req.body.bookingId
    });
    SuccessResponse.data = payment;
    inMemDb[idempotencyKey] = idempotencyKey;
    return res
      .status(StatusCodes.CREATED)
      .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  createBooking,
  makePayment
}