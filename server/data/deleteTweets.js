const Tweet = require('./../models').Tweet;
const db = require('./../models');
const { Op } = require('sequelize');

(async () => {
  await db.sequelize.authenticate();

  try {
    await Tweet.destroy({
      where: {
        publishedDate: {
          [Op.gte]: db.sequelize.literal("NOW() - INTERVAL '7d'")
        }
      }
    });

    db.sequelize.close();
  } catch (error) {
    console.log({ error });
    db.sequelize.close();
  }
})().catch(err => console.error(err));
