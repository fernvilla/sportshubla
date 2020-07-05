require('dotenv').config();

const TwitterAccount = require('./../models').TwitterAccount;
const Tweet = require('./../models').Tweet;
const Twitter = require('twitter-lite');
const db = require('./../models');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

(async () => {
  await db.sequelize.authenticate();

  try {
    const accounts = await TwitterAccount.findAll();

    const fetchAndMapTweets = async (account, twitterAccountId) => {
      const data = await client.get('statuses/user_timeline', {
        screen_name: account,
        include_rts: true,
        exclude_replies: true,
        count: 10
      });

      return data.map(d => {
        const t = {
          twitterAccountId,
          text: d.text,
          tweetId: d.id_str,
          publishedDate: d.created_at,
          screenName: d.user.screen_name,
          name: d.user.name,
          profileImageUrl: d.user.profile_image_url,
          mediaUrl: d.extended_entities ? d.extended_entities.media[0].media_url : null,
          profileBannerUrl: d.user.profile_banner_url || null
        };

        return t;
      });
    };

    const data = await Promise.all(
      accounts.map(({ account, id }) => fetchAndMapTweets(account, id))
    );
    const tweets = data.reduce((acc, curr) => acc.concat(curr), []);

    await Tweet.bulkCreate(tweets, { ignoreDuplicates: true });

    db.sequelize.close();
  } catch (error) {
    console.log(error.errors);
    db.sequelize.close();
  }
})().catch(err => console.error(err));
