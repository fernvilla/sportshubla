const FeedItem = require('./../models').FeedItem;
const FeedItemType = require('./../models').FeedItemType;
const Tweet = require('./../models').Tweet;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await FeedItem.findAll({
        include: [
          { model: FeedItemType, as: 'feedItemType' },
          { model: Tweet, as: 'tweet' }
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
