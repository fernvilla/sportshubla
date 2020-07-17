'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsSource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NewsSource.hasMany(models.RssFeed, { foreignKey: 'newsSourceId', as: 'rssFeeds' });
      NewsSource.hasMany(models.Article, { foreignKey: 'newsSourceId', as: 'articls' });

      NewsSource.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team' });
    }
  }
  NewsSource.init(
    {
      websiteUrl: DataTypes.STRING,
      slug: DataTypes.STRING,
      name: DataTypes.STRING,
      teamId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'NewsSource'
    }
  );
  return NewsSource;
};
