'use strict';
module.exports = (sequelize, DataTypes) => {
  const TwitterAccount = sequelize.define(
    'TwitterAccount',
    {
      teamId: DataTypes.INTEGER,
      account: DataTypes.STRING,
    },
    {},
  );
  TwitterAccount.associate = function (models) {
    TwitterAccount.belongsTo(models.Team, {
      foreignKey: 'teamId',
      as: 'team',
    });

    TwitterAccount.hasMany(models.Tweet, {
      foreignKey: 'twitterAccountId',
      as: 'tweets',
    });
  };
  return TwitterAccount;
};
