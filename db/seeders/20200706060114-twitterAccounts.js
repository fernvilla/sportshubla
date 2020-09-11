'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'TwitterAccounts',
      [
        {
          teamId: 1,
          twitterAccountTypeId: 1,
          accountName: 'lakers',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          teamId: 2,
          twitterAccountTypeId: 1,
          accountName: 'dodgers',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          teamId: 3,
          twitterAccountTypeId: 1,
          accountName: 'ramsnfl',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          teamId: 4,
          twitterAccountTypeId: 1,
          accountName: 'chargers',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TwitterAccounts', null, {});
  }
};
