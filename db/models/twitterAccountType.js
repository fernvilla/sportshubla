'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TwitterAccountType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TwitterAccountType.hasMany(models.TwitterAccount, {
        foreignKey: 'twitterAccountTypeId',
        as: 'twitterAccounts'
      });
    }
  }
  TwitterAccountType.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'TwitterAccountType'
    }
  );
  return TwitterAccountType;
};
