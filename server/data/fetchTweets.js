require('dotenv').config();

const TwitterAccount = require('./../models').TwitterAccount;
const Tweet = require('./../models').Tweet;
const FeedItem = require('./../models').FeedItem;
const FeedItemType = require('./../models').FeedItemType;
const Team = require('./../models').Team;
const Twitter = require('twitter-lite');
const db = require('./../models');

const user = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET
});

(async () => {
  await db.sequelize.authenticate();

  try {
    const response = await user.getBearerToken();
    const app = new Twitter({ bearer_token: response.access_token });
    const accounts = await TwitterAccount.findAll({
      include: { model: Team, as: 'team' }
    });

    const fetchAndMapTweets = async ({ accountName, id, team }) => {
      const data = await app.get('statuses/user_timeline', {
        screen_name: accountName,
        include_rts: true,
        exclude_replies: true,
        count: 15
      });

      try {
        const feedItemType = await FeedItemType.findOne({ where: { type: 'tweet' } });

        const createTweet = async t => {
          const feedItem = await FeedItem.create({
            feedItemTypeId: feedItemType.id,
            teamId: team.id
          });

          const tweet = {
            twitterAccountId: id,
            text: t.text,
            tweetId: t.id_str,
            publishedDate: t.created_at,
            screenName: t.user.screen_name,
            name: t.user.name,
            profileImageUrl: t.user.profile_image_url,
            mediaUrl: t.extended_entities ? t.extended_entities.media[0].media_url : null,
            profileBannerUrl: t.user.profile_banner_url || null,
            feedItemId: feedItem.id
          };

          return tweet;
        };

        const results = await Promise.all(data.map(createTweet));

        return results;
      } catch (err) {
        console.error('fetchAndMapTweets err', err);
        throw new Error(err);
      }
    };

    const data = await Promise.all(accounts.map(fetchAndMapTweets));
    const tweets = data.reduce((acc, curr) => acc.concat(curr), []);

    await Tweet.bulkCreate(tweets, { ignoreDuplicates: true });

    db.sequelize.close();
  } catch (error) {
    console.error('main fetch error(s)', error);
    db.sequelize.close();
  }
})().catch(err => console.error(err));
