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
      NewsSource.hasMany(models.TwitterAccount, {
        foreignKey: 'newsSourceId',
        as: 'twitterAccounts'
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
