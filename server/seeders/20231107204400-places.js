'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const parkingPlacesData = [];

    for (let i = 1; i <= 30; i++) {
      parkingPlacesData.push({
        place: i,
      })
    }

    return queryInterface.bulkInsert('ParkingPlaces', parkingPlacesData);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ParkingPlaces', null, {});
  }
};
