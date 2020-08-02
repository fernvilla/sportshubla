'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'TwitterAccountTypes',
      [
        {
          type: 'team',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          type: 'media',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          type: 'player',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TwitterAccountTypes', null, {});
  }
};
