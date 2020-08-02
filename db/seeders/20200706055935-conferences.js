'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Conferences',
      [
        {
          fullName: 'Western Conference',
          slug: 'western-conference',
          leagueId: 1,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          fullName: 'National League',
          slug: 'national-league',
          leagueId: 2,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Conferences', null, {});
  }
};
