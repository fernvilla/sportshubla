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
      Team.hasMany(models.FeedItem, { foreignKey: 'teamId', as: 'feedItems' });
      Team.hasMany(models.TwitterAccount, { foreignKey: 'teamId', as: 'twitterAccounts' });
      Team.hasMany(models.NewsSource, { foreignKey: 'teamId', as: 'newsSources' });
    }
  }
  Team.init(
    {
      fullName: DataTypes.STRING,
      shortName: DataTypes.STRING,
      slug: DataTypes.STRING,
      websiteUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Team'
    }
  );
  return Team;
};
