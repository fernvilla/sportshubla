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
      Team.belongsTo(models.Conference, { foreignKey: 'conferenceId', as: 'conference' });
      Team.belongsTo(models.Division, { foreignKey: 'divisionId', as: 'division' });

      Team.hasMany(models.FeedItem, { foreignKey: 'teamId', as: 'feedItems' });
      Team.hasMany(models.TwitterAccount, { foreignKey: 'teamId', as: 'twitterAccounts' });
    }
  }
  Team.init(
    {
      fullName: DataTypes.STRING,
      shortName: DataTypes.STRING,
      slug: DataTypes.STRING,
      websiteUrl: DataTypes.STRING,
      leagueId: DataTypes.INTEGER,
      conferenceId: DataTypes.INTEGER,
      divisionId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Team'
    }
  );
  return Team;
};
