const { StatusCodes } = require('http-status-codes');

const { Bookings } = require('../models');
const CrudRepository = require('./crud-repository');

class BookingRepository extends CrudRepository {
    constructor() {
        super(Bookings);
    }

    async createBooking(data, transaction) {
        const response = await Bookings.create(data, {transaction: transaction});
        return response;
    } 
}

module.exports = BookingRepository;