'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'NewsSources',
      [
        {
          websiteUrl: 'http://www.lakers.com',
          slug: 'lakers-official-site',
          name: 'Lakers Official Site',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          websiteUrl: 'http://www.dodgers.com',
          slug: 'dodgers-official-site',
          name: 'Dodgers Official Site',
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
