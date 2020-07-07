'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Division extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Division.belongsTo(models.Conference, { foreignKey: 'conferenceId', as: 'conference' });

      Division.hasMany(models.Team, { foreignKey: 'divisionId', as: 'teams' });
    }
  }
  Division.init(
    {
      fullName: DataTypes.STRING,
      shortName: DataTypes.STRING,
      slug: DataTypes.STRING,
      websiteUrl: DataTypes.STRING,
      conferenceId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Division'
    }
  );
  return Division;
};
