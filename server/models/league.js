'use strict';
module.exports = (sequelize, DataTypes) => {
  const League = sequelize.define('League', {
    name: DataTypes.STRING,
    shortName: DataTypes.STRING,
    siteUrl: DataTypes.STRING,
    slug: DataTypes.STRING
  });
  League.associate = function (models) {
    League.hasMany(models.Team, {
      foreignKey: 'leagueId',
      as: 'teams'
    });
  };
  return League;
};
