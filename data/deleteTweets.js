const Tweet = require('./../db/models').Tweet;
const FeedItem = require('./../db/models').FeedItem;
const db = require('./../db/models');
const { Op } = require('sequelize');

(async () => {
  try {
    await db.sequelize.authenticate();

    const tweets = await Tweet.findAll({
      where: {
        publishedDate: {
          [Op.gte]: db.sequelize.literal("NOW() - INTERVAL '7d'")
        }
      }
    });

    const deleteFeedItemAndTweet = async tweet => {
      try {
        const feedItem = await FeedItem.findOne({ where: { id: tweet.feedItemId } });

        if (feedItem) await feedItem.destroy();
        if (tweet) await tweet.destroy();
      } catch (err) {
        console.error(`deleteFeedItemAndTweet error: ${err}`);
      }
    };

    await Promise.all(tweets.map(tweet => deleteFeedItemAndTweet(tweet)));

    db.sequelize.close();
  } catch (error) {
    console.error(`deleteTweets error: ${err}`);

    db.sequelize.close();
  }
})();
