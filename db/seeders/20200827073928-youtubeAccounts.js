'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'YoutubeAccounts',
      [
        {
          teamId: 1,
          channelId: 'UC8CSt-oVqy8pUAoKSApTxQw',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('YoutubeAccounts', null, {});
  }
};
