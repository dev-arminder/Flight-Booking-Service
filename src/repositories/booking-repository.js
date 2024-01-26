const { StatusCodes } = require('http-status-codes');
const { Bookings } = require('../models');
const { Op } = require("sequelize");
const CrudRepository = require('./crud-repository');
const {Enums} = require('../utils/common');
const { BOOKED, CANCELLED } = Enums.BOOKING_STATUS;

class BookingRepository extends CrudRepository {
    constructor() {
        super(Bookings);
    }

    async createBooking(data, transaction) {
        const response = await Bookings.create(data, {transaction: transaction});
        return response;
    }
    
    async get(data, transaction) {
        const response = await Bookings.findByPk(data, {transaction: transaction});
        if(!response) {
            throw new AppError('Not able to fund the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async update(id, data, transaction) { // data -> {col: value, ....}
        const response = await Bookings.update(data, {
            where: {
                id: id
            }
        }, {transaction: transaction});
        return response;
    }

    async cancelOldBookings(timestamp){
        const response = await Bookings.update({status: CANCELLED},{
            where: {
                [Op.and]: [
                    {
                        createdAt: {
                            [Op.lt]: timestamp
                        }
                    }, 
                    {
                        status: {
                            [Op.ne]: BOOKED
                        }
                    },
                    {
                        status: {
                            [Op.ne]: CANCELLED
                        }
                    }
                ]

            }
        });
        return response;
    }
}

module.exports = BookingRepository;