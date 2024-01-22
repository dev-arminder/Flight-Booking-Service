'use strict';
/** @type {import('sequelize-cli').Migration} */

const { commonUtils }  = require('../utils');
const { Enums } = commonUtils;
const { BOOKING_STATUS } = Enums;
const { BOOKED, PENDING, CANCELLED, INITIATED } = BOOKING_STATUS;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: [ BOOKED, PENDING, CANCELLED, INITIATED ],
        allowNull: false,
        defaultValue: INITIATED
      },
      noOfSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalCost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};