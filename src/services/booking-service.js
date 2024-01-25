const {StatusCodes} = require('http-status-codes');
const { BookingRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const axios = require('axios');
const db = require('../models');
const { ServerConfig } = require('../config')

const bookingRepository = new BookingRepository();


async function createBooking(data) {
    const transaction = await db.sequelize.transaction();
    try {
        console.log('Before Flight', data)
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
        const flightData = flight.data.data;
        if(data.noOfSeats > flightData.totalSeats) {
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }
        const totalBillingAmount = data.noOfSeats * flightData.price;
        const bookingPayload = {...data, totalCost: totalBillingAmount};
        console.log(bookingPayload)
        const booking = await bookingRepository.createBooking(bookingPayload, transaction);
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`, {
            seats: data.noOfSeats
        });
  
        await transaction.commit();
        return booking;
    } catch(error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
  createBooking
}