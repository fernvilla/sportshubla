const Tweet = require('./../db/models').Tweet;
const db = require('./../db/models');
const { Op } = require('sequelize');

(async () => {
  try {
    await db.sequelize.authenticate();

    const tweets = await Tweet.findAll({
      where: {
        publishedDate: {
          [Op.lte]: db.sequelize.literal("NOW() - INTERVAL '7d'")
        }
      }
    });

    const deleteTweet = async tweet => {
      try {
        if (tweet) await tweet.destroy();
      } catch (err) {
        console.error(`deleteTweet error: ${err}`);
      }
    };

    await Promise.all(tweets.map(tweet => deleteTweet(tweet)));

    db.sequelize.close();
  } catch (error) {
    console.error(`deleteTweets error: ${err}`);

    db.sequelize.close();
  }
})();
