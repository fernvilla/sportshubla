'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class YoutubeVideo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      YoutubeVideo.belongsTo(models.YoutubeAccount, {
        foreignKey: 'youtubeAccountId',
        as: 'youtubeAccount'
      });
    }
  }
  YoutubeVideo.init(
    {
      title: DataTypes.STRING,
      publishedDate: DataTypes.DATE,
      youtubeAccountId: DataTypes.INTEGER,
      videoId: DataTypes.STRING,
      description: DataTypes.TEXT,
      thumbnail: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'YoutubeVideo'
    }
  );
  return YoutubeVideo;
};
