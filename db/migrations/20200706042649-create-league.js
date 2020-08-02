'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Leagues', {
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
    await queryInterface.dropTable('Leagues');
  }
};
