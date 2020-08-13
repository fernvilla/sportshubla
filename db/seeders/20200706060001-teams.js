'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Teams',
      [
        {
          fullName: 'Los Angeles Lakers',
          shortName: 'Lakers',
          websiteUrl: 'http://www.lakers.com',
          slug: 'los-angeles-lakers',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          fullName: 'Los Angeles Dodgers',
          shortName: 'Dodgers',
          websiteUrl: 'http://www.dodgers.com',
          slug: 'los-angeles-dodgers',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          fullName: 'Los Angeles Rams',
          shortName: 'Rams',
          websiteUrl: 'http://www.therams.com',
          slug: 'los-angeles-rams',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          fullName: 'Los Angeles Chargers',
          shortName: 'Chargers',
          websiteUrl: 'http://www.chargers.com',
          slug: 'los-angeles-chargers',
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
