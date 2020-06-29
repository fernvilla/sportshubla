'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsTo(models.League, { foreignKey: 'leagueId', as: 'league' });
    }
  }
  Team.init(
    {
      fullName: DataTypes.STRING,
      shortName: DataTypes.STRING,
      websiteUrl: DataTypes.STRING,
      slug: DataTypes.STRING,
      leagueId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Team'
    }
  );
  return Team;
};
