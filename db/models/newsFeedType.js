'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsFeedType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NewsFeedType.hasMany(models.NewsFeed, {
        foreignKey: 'newsFeedTypeId',
        as: 'newsFeeds'
      });
    }
  }
  NewsFeedType.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'NewsFeedType'
    }
  );
  return NewsFeedType;
};
