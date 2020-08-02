'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conference.hasMany(models.Division, { foreignKey: 'conferenceId', as: 'divisions' });
      Conference.hasMany(models.Team, { foreignKey: 'conferenceId', as: 'teams' });

      Conference.belongsTo(models.League, { foreignKey: 'leagueId', as: 'league' });
    }
  }
  Conference.init(
    {
      fullName: DataTypes.STRING,
      shortName: DataTypes.STRING,
      slug: DataTypes.STRING,
      websiteUrl: DataTypes.STRING,
      leagueId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Conference'
    }
  );
  return Conference;
};
