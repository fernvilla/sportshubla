'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Divisions',
      [
        {
          fullName: 'Pacific Division',
          slug: 'pacific-division',
          conferenceId: 1,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Divisions', null, {});
  }
};
