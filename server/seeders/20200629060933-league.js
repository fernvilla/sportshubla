'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Leagues',
      [
        {
          fullName: 'National Basketball Association',
          shortName: 'NBA',
          websiteUrl: 'https://www.nba.com',
          slug: 'national-basketball-association',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          fullName: 'Major League Baseball',
          shortName: 'MLB',
          websiteUrl: 'https://www.mlb.com',
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
