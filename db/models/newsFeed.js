'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsFeed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NewsFeed.belongsTo(models.NewsSource, { foreignKey: 'newsSourceId', as: 'newsSource' });
      NewsFeed.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team' });
      NewsFeed.belongsTo(models.NewsFeedType, { foreignKey: 'newsFeedTypeId', as: 'newsFeedType' });

      NewsFeed.hasMany(models.Article, { foreignKey: 'newsFeedId', as: 'articles' });
    }
  }
  NewsFeed.init(
    {
      url: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      lastStatusCode: DataTypes.INTEGER,
      newsSourceId: DataTypes.INTEGER,
      newsFeedTypeId: DataTypes.INTEGER,
      teamId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'NewsFeed'
    }
  );
  return NewsFeed;
};
