'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TwitterAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TwitterAccount.belongsTo(models.TwitterAccountType, {
        foreignKey: 'twitterAccountTypeId',
        as: 'twitterAccountType'
      });
      TwitterAccount.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'team'
      });
      // TwitterAccount.belongsTo(models.NewsSource, {
      //   foreignKey: 'newsSourceId',
      //   as: 'newsSource'
      // });

      TwitterAccount.hasMany(models.Tweet, {
        foreignKey: 'twitterAccountId',
        as: 'tweets'
      });
    }
  }
  TwitterAccount.init(
    {
      accountName: DataTypes.STRING,
      twitterAccountTypeId: DataTypes.INTEGER,
      teamId: DataTypes.INTEGER,
      newsSourceId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'TwitterAccount'
    }
  );
  return TwitterAccount;
};
