'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class YoutubeAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      YoutubeAccount.belongsTo(models.Team, {
        foreignKey: 'teamId',
        as: 'team'
      });
      YoutubeAccount.hasMany(models.YoutubeVideo, {
        foreignKey: 'youtubeAccountId',
        as: 'youtubeVideos'
      });
      YoutubeAccount.belongsTo(models.NewsSource, {
        foreignKey: 'newsSourceId',
        as: 'newsSource'
      });
    }
  }
  YoutubeAccount.init(
    {
      teamId: DataTypes.INTEGER,
      channelId: DataTypes.STRING,
      name: DataTypes.STRING,
      newsSourceId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'YoutubeAccount'
    }
  );
  return YoutubeAccount;
};
