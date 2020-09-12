'use strict';

const { newsFeedTypes } = require('../../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'NewsFeedTypes',
      [
        {
          name: newsFeedTypes.TYPE_RSS,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NewsFeedTypes', null, {});
  }
};
