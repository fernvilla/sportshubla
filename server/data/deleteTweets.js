const Tweet = require('./../models').Tweet;
const FeedItem = require('./../models').FeedItem;
const db = require('./../models');
const { Op } = require('sequelize');

(async () => {
  await db.sequelize.authenticate();

  try {
    const tweets = await Tweet.findAll({
      where: {
        publishedDate: {
          [Op.gte]: db.sequelize.literal("NOW() - INTERVAL '7d'")
        }
      }
    });

    const deleteFeedItemAndTweet = async tweet => {
      const feedItem = await FeedItem.findOne({ where: { id: tweet.feedItemId } });

      await feedItem.destroy();
      await tweet.destroy();
    };

    await Promise.all(tweets.map(tweet => deleteFeedItemAndTweet(tweet)));

    db.sequelize.close();
  } catch (error) {
    console.log({ error });
    db.sequelize.close();
  }
})().catch(err => console.error(err));
