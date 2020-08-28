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
        },
        {
          teamId: 2,
          channelId: 'UC05cNJvMKzDLRPo59X2Xx7g',
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
