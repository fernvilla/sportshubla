'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'RssFeeds',
      [
        {
          url: 'https://www.nba.com/lakers/rss.xml',
          isActive: true,
          newsSourceId: 1,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          url: 'https://www.mlb.com/dodgers/feeds/news/rss.xml',
          isActive: true,
          newsSourceId: 2,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RssFeeds', null, {});
  }
};
