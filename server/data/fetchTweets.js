require('dotenv').config();

const TwitterAccount = require('./../models').TwitterAccount;
const Tweet = require('./../models').Tweet;
const FeedItem = require('./../models').FeedItem;
const FeedItemType = require('./../models').FeedItemType;
const Team = require('./../models').Team;
const Twitter = require('twitter-lite');
const db = require('./../models');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const user = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET
});

(async () => {
  try {
    await db.sequelize.authenticate();

    const response = await user.getBearerToken();
    const app = new Twitter({ bearer_token: response.access_token });
    const accounts = await TwitterAccount.findAll({ include: { model: Team, as: 'team' } });

    const fetchAndMapTweets = async ({ accountName, id, team }, feedItemType) => {
      try {
        const data = await app.get('statuses/user_timeline', {
          screen_name: accountName,
          include_rts: true,
          exclude_replies: true,
          count: 15
        });

        const createTweet = async tweet => {
          const newTweet = {
            twitterAccountId: id,
            text: entities.decode(tweet.text),
            tweetId: tweet.id_str,
            publishedDate: tweet.created_at || new Date(),
            screenName: tweet.user.screen_name,
            name: tweet.user.name,
            profileImageUrl: tweet.user.profile_image_url,
            mediaUrl: tweet.extended_entities ? tweet.extended_entities.media[0].media_url : null,
            profileBannerUrl: tweet.user.profile_banner_url || null
          };

          const [dbTweet, created] = await Tweet.findCreateFind({
            where: { tweetId: newTweet.tweetId },
            defaults: newTweet
          });

          if (created) {
            const feedItem = await FeedItem.create({
              feedItemTypeId: feedItemType.id,
              teamId: team.id,
              publishedDate: dbTweet.publishedDate
            });

            dbTweet.feedItemId = feedItem.id;

            await dbTweet.save();
          }
        };

        await Promise.all(data.map(createTweet));
      } catch (err) {
        console.error('fetchAndMapTweets err', err);
        throw new Error(err);
      }
    };

    const feedItemType = await FeedItemType.findOne({ where: { type: 'tweet' } });

    await Promise.all(accounts.map(account => fetchAndMapTweets(account, feedItemType)));

    db.sequelize.close();
  } catch (error) {
    console.error('main fetch tweets error(s)', error);
    db.sequelize.close();
  }
})();
