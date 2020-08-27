'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('YoutubeVideos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      youtubeAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      publishedDate: {
        type: Sequelize.DATE
      },
      videoId: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      thumbnail: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('YoutubeVideos');
  }
};
