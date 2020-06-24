'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Tweets',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        twitterAccountId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        text: {
          type: Sequelize.TEXT
        },
        tweetId: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true
        },
        publishedDate: {
          type: Sequelize.DATE
        },
        screenName: {
          type: Sequelize.STRING
        },
        mediaUrl: {
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
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      { underscored: true }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tweets');
  }
};
