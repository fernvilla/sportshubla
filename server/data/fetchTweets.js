require('dotenv').config();

const TwitterAccount = require('./../models').TwitterAccount;
const Tweet = require('./../models').Tweet;
const FeedItem = require('./../models').FeedItem;
const FeedItemType = require('./../models').FeedItemType;
const Twitter = require('twitter-lite');
const db = require('./../models');

const user = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET
  // access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

(async () => {
  await db.sequelize.authenticate();

  try {
    const response = await user.getBearerToken();
    const app = new Twitter({ bearer_token: response.access_token });
    const accounts = await TwitterAccount.findAll();

    const fetchAndMapTweets = async (account, twitterAccountId) => {
      const data = await app.get('statuses/user_timeline', {
        screen_name: account,
        include_rts: true,
        exclude_replies: true,
        count: 15
      });

      try {
        const feedItemType = await FeedItemType.findOne({ where: { type: 'tweet' } });

        const feedItem = await FeedItem.create({
          feedItemTypeId: feedItemType.id,
          teamId: account.team.id
        });

        return data.map(d => ({
          twitterAccountId,
          text: d.text,
          tweetId: d.id_str,
          publishedDate: d.created_at,
          screenName: d.user.screen_name,
          name: d.user.name,
          profileImageUrl: d.user.profile_image_url,
          mediaUrl: d.extended_entities ? d.extended_entities.media[0].media_url : null,
          profileBannerUrl: d.user.profile_banner_url || null,
          feedItemId: feedItem.id
        }));
      } catch (err) {
        console.log('fetchAndMapTweets err', err);
        throw new Error(err);
      }
    };

    const data = await Promise.all(
      accounts.map(({ accountName, id }) => fetchAndMapTweets(accountName, id))
    );
    const tweets = data.reduce((acc, curr) => acc.concat(curr), []);

    await Tweet.bulkCreate(tweets, { ignoreDuplicates: true });

    db.sequelize.close();
  } catch (error) {
    console.log('main fetch error(s)', error.errors);
    db.sequelize.close();
  }
})().catch(err => console.error(err));
