'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Teams',
      [
        {
          name: 'Los Angeles Lakers',
          shortName: 'Lakers',
          siteUrl: 'https://www.lakers.com',
          slug: 'los-angeles-lakers',
          leagueId: 1,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'Los Angeles Dodgers',
          shortName: 'Dodgers',
          siteUrl: 'https://www.dodgers.com',
          slug: 'los-angeles-dodgers',
          leagueId: 2,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teams', null, {});
  }
};
