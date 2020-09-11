'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'NewsFeeds',
      [
        {
          url: 'http://www.nba.com/lakers/rss.xml',
          isActive: true,
          newsSourceId: 1,
          teamId: 1,
          newsFeedTypeId: 1,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        },
        {
          url: 'https://www.mlb.com/dodgers/feeds/news/rss.xml',
          isActive: true,
          newsSourceId: 2,
          teamId: 2,
          newsFeedTypeId: 1,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NewsFeeds', null, {});
  }
};
