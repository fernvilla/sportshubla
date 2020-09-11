'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
      publishedDate: {
        type: Sequelize.DATE
      },
      url: {
        unique: true,
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      clicks: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      author: {
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.TEXT
      },
      newsFeedId: {
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
    await queryInterface.dropTable('Articles');
  }
};
