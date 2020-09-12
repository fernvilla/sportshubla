'use strict';

const { twitterAccountTypes } = require('../../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'TwitterAccountTypes',
      [
        {
          name: twitterAccountTypes.TYPE_TEAM,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TwitterAccountTypes', null, {});
  }
};
