'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'NewsSources',
      [
        {
          websiteUrl: 'https://www.lakers.com',
          slug: 'lakers-official-site',
          name: 'Lakers Official Site',
          teamId: 1,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          websiteUrl: 'https://www.dodgers.com',
          slug: 'dodgers-official-site',
          name: 'Dodgerds Official Site',
          teamId: 2,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NewsSources', null, {});
  }
};
