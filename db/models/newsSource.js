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
      NewsSource.hasMany(models.NewsFeed, { foreignKey: 'newsSourceId', as: 'newsFeeds' });

      NewsSource.hasOne(models.TwitterAccount, {
        foreignKey: 'newsSourceId',
        as: 'twitterAccount'
      });

      NewsSource.hasOne(models.YoutubeAccount, {
        foreignKey: 'newsSourceId',
        as: 'youtubeAccount'
      });
    }
  }
  NewsSource.init(
    {
      websiteUrl: DataTypes.STRING,
      slug: DataTypes.STRING,
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'NewsSource'
    }
  );
  return NewsSource;
};
