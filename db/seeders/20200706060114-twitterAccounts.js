'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'TwitterAccounts',
      [
        {
          teamId: 1,
          twitterAccountTypeId: 1,
          name: 'lakers',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          teamId: 2,
          twitterAccountTypeId: 1,
          name: 'dodgers',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          teamId: 3,
          twitterAccountTypeId: 1,
          name: 'ramsnfl',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          teamId: 4,
          twitterAccountTypeId: 1,
          name: 'chargers',
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
