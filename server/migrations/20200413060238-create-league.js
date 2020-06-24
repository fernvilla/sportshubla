'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Leagues',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING
        },
        shortName: {
          type: Sequelize.STRING
        },
        siteUrl: {
          type: Sequelize.STRING
        },
        slug: {
          allowNull: false,
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
    return queryInterface.dropTable('Leagues');
  }
};
