'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.NewsSource, { foreignKey: 'newsSourceId', as: 'newsSource' });
      Article.belongsTo(models.FeedItem, { foreignKey: 'feedItemId', as: 'feedItem' });
    }
  }
  Article.init(
    {
      title: DataTypes.TEXT,
      publishedDate: DataTypes.DATE,
      url: DataTypes.STRING,
      image: DataTypes.STRING,
      clicks: DataTypes.INTEGER,
      author: DataTypes.STRING,
      summary: DataTypes.TEXT,
      feedItemId: DataTypes.INTEGER,
      newsSourceId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Article'
    }
  );
  return Article;
};
