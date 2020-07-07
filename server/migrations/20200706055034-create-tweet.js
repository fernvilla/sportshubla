'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tweets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.TEXT
      },
      tweetId: {
        type: Sequelize.STRING
      },
      publishedDate: {
        type: Sequelize.DATE
      },
      screenName: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      profileImageUrl: {
        type: Sequelize.STRING
      },
      profileBannerUrl: {
        type: Sequelize.STRING
      },
      mediaUrl: {
        type: Sequelize.STRING
      },
      twitterAccountId: {
        type: Sequelize.INTEGER
      },
      feedItemId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tweets');
  }
};
