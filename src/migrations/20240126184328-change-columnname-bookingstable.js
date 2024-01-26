'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface. renameColumn('Bookings', 'type', 'status');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface. renameColumn('Bookings', 'status', 'type');
  }
};
