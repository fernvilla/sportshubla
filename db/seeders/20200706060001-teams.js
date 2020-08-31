'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Teams',
      [
        {
          name: 'Los Angeles Lakers',
          shortName: 'Lakers',
          websiteUrl: 'http://www.lakers.com',
          slug: 'los-angeles-lakers',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'Los Angeles Dodgers',
          shortName: 'Dodgers',
          websiteUrl: 'http://www.dodgers.com',
          slug: 'los-angeles-dodgers',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'Los Angeles Rams',
          shortName: 'Rams',
          websiteUrl: 'http://www.therams.com',
          slug: 'los-angeles-rams',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'Los Angeles Chargers',
          shortName: 'Chargers',
          websiteUrl: 'http://www.chargers.com',
          slug: 'los-angeles-chargers',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'Los Angeles Clippers',
          shortName: 'Clippers',
          websiteUrl: 'http://www.clippers.com',
          slug: 'los-angeles-clippers',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'Los Angeles Football Club',
          shortName: 'LAFC',
          websiteUrl: 'http://www.lafc.com',
          slug: 'los-angeles-football-club',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'Los Angeles Galaxy',
          shortName: 'Galaxy',
          websiteUrl: 'http://www.lagalaxy.com',
          slug: 'los-angeles-galaxy',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'Los Angeles Kings',
          shortName: 'Kings',
          websiteUrl: 'http://www.lakings.com',
          slug: 'los-angeles-kings',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'Los Angeles Angels',
          shortName: 'Angels',
          websiteUrl: 'http://www.angels.com',
          slug: 'los-angeles-angels',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'Anaheim Ducks',
          shortName: 'Ducks',
          websiteUrl: 'http://www.anaheimducks.com',
          slug: 'anaheim-ducks',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'UCLA Bruins',
          shortName: 'UCLA',
          websiteUrl: 'http://www.uclabruins.com',
          slug: 'ucla-bruins',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'USC Trojans',
          shortName: 'USC',
          websiteUrl: 'http://www.usctrojans.com',
          slug: 'usc-trojans',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'Los Angeles Sparks',
          shortName: 'Sparks',
          websiteUrl: 'http://sparks.wnba.com',
          slug: 'los-angeles-sparks',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          name: 'South Bay Lakers',
          shortName: 'SB Lakers',
          websiteUrl: 'https://southbay.gleague.nba.com',
          slug: 'south-bay-lakers',
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
