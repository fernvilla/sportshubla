'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Leagues',
      [
        {
          name: 'National Basketball Association',
          shortName: 'NBA',
          siteUrl: 'https://www.nba.com',
          slug: 'national-basketball-association',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'Major League Baseball',
          shortName: 'MLB',
          siteUrl: 'https://www.mlb.com',
          slug: 'major-league-baseball',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Leagues', null, {});
  }
};
