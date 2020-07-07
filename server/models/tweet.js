'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tweet.belongsTo(models.TwitterAccount, {
        foreignKey: 'twitterAccountId',
        as: 'twitterAccount'
      });
      Tweet.belongsTo(models.FeedItem, { foreignKey: 'feedItemId', as: 'feedItem' });
    }
  }
  Tweet.init(
    {
      text: DataTypes.TEXT,
      tweetId: DataTypes.STRING,
      publishedDate: DataTypes.DATE,
      screenName: DataTypes.STRING,
      name: DataTypes.STRING,
      profileImageUrl: DataTypes.STRING,
      profileBannerUrl: DataTypes.STRING,
      mediaUrl: DataTypes.STRING,
      twitterAccountId: DataTypes.INTEGER,
      feedItemId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Tweet'
    }
  );
  return Tweet;
};
