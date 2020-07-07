'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Teams',
      [
        {
          fullName: 'Los Angeles Lakers',
          shortName: 'Lakers',
          websiteUrl: 'https://www.lakers.com',
          slug: 'los-angeles-lakers',
          leagueId: 1,
          conferenceId: 1,
          divisionId: 1,
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
