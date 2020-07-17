'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FeedItem.belongsTo(models.FeedItemType, { foreignKey: 'feedItemTypeId', as: 'feedItemType' });
      FeedItem.belongsTo(models.Team, { foreignKey: 'teamId', as: 'team' });

      FeedItem.hasOne(models.Tweet, { foreignKey: 'feedItemId', as: 'tweet' });
      FeedItem.hasOne(models.Article, { foreignKey: 'feedItemId', as: 'article' });
    }
  }
  FeedItem.init(
    {
      feedItemTypeId: DataTypes.INTEGER,
      teamId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'FeedItem'
    }
  );
  return FeedItem;
};
