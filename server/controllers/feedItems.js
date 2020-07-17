const FeedItem = require('./../models').FeedItem;
const FeedItemType = require('./../models').FeedItemType;
const Tweet = require('./../models').Tweet;
const Article = require('./../models').Article;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await FeedItem.findAll({
        include: [
          { model: FeedItemType, as: 'feedItemType' },
          { model: Tweet, as: 'tweet' },
          { model: Article, as: 'article' }
        ],
        order: [
          [{ model: Tweet, as: 'tweet' }, 'publishedDate', 'DESC'],
          [{ model: Article, as: 'article' }, 'publishedDate', 'DESC']
        ]
      });

      return res.status(200).send(payload);
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching feed items.'
      });
    }
  }
};
