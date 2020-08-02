'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedItemType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FeedItemType.hasMany(models.FeedItem, { foreignKey: 'feedItemTypeId', as: 'feedItems' });
    }
  }
  FeedItemType.init(
    {
      type: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'FeedItemType'
    }
  );
  return FeedItemType;
};
