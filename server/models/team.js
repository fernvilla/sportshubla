'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    leagueId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    shortName: DataTypes.STRING,
    siteUrl: DataTypes.STRING,
    slug: DataTypes.STRING
  });
  Team.associate = function (models) {
    Team.belongsTo(models.League, {
      foreignKey: 'leagueId',
      as: 'league'
    });

    Team.hasMany(models.TwitterAccount, {
      foreignKey: 'teamId',
      as: 'twitterAccounts'
    });
  };
  return Team;
};
