'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define(
    'Tweet',
    {
      twitterAccountId: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      tweetId: DataTypes.STRING,
      publishedDate: DataTypes.DATE,
      screenName: DataTypes.STRING,
      name: DataTypes.STRING,
      profileImageUrl: DataTypes.STRING,
      profileBannerUrl: DataTypes.STRING,
      mediaUrl: DataTypes.STRING
    },
    {}
  );
  Tweet.associate = function (models) {
    Tweet.belongsTo(models.TwitterAccount, {
      foreignKey: 'twitterAccountId',
      as: 'twitterAccount'
    });
  };
  return Tweet;
};
