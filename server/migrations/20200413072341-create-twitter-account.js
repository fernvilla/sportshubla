'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'TwitterAccounts',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        teamId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        account: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      { underscored: true },
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TwitterAccounts');
  },
};
