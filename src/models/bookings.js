'use strict';
const {
  Model
} = require('sequelize');

const { commonUtils }  = require('../utils');
const { Enums } = commonUtils;
const { BOOKING_STATUS } = Enums;
const { BOOKED, PENDING, CANCELLED, INITIATED } = BOOKING_STATUS;

module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookings.init({
    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: [ BOOKED, PENDING, CANCELLED, INITIATED ],
      allowNull: false,
      defaultValue: INITIATED
    },
    noOfSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    totalCost:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Bookings',
  });
  return Bookings;
};