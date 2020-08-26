'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RssFeed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RssFeed.belongsTo(models.NewsSource, { foreignKey: 'newsSourceId', as: 'newsSource' });
      RssFeed.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team' });

      RssFeed.hasMany(models.Article, { foreignKey: 'rssFeedId', as: 'articles' });
    }
  }
  RssFeed.init(
    {
      url: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      lastStatusCode: DataTypes.INTEGER,
      newsSourceId: DataTypes.INTEGER,
      teamId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'RssFeed'
    }
  );
  return RssFeed;
};
