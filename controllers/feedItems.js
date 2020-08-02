const FeedItem = require('./../db/models').FeedItem;
const FeedItemType = require('./../db/models').FeedItemType;
const Tweet = require('./../db/models').Tweet;
const Article = require('./../db/models').Article;
const NewsSource = require('./../db/models').NewsSource;
const Team = require('./../db/models').Team;
const TwitterAccount = require('./../db/models').TwitterAccount;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await FeedItem.findAll({
        include: [
          { model: FeedItemType, as: 'feedItemType' },
          {
            model: Tweet,
            as: 'tweet',
            include: {
              model: TwitterAccount,
              as: 'twitterAccount',
              include: { model: Team, as: 'team' }
            }
          },
          {
            model: Article,
            as: 'article',
            include: {
              model: NewsSource,
              as: 'newsSource',
              include: { model: Team, as: 'team' }
            }
          }
        ],
        order: [['publishedDate', 'DESC']]
      });

      return res.status(200).send(payload);
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching feed items.'
      });
    }
  }
};
