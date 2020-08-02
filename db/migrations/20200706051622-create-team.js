'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      shortName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slug: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      websiteUrl: {
        type: Sequelize.STRING
      },
      leagueId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      conferenceId: {
        type: Sequelize.INTEGER
      },
      divisionId: {
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
    await queryInterface.dropTable('Teams');
  }
};
