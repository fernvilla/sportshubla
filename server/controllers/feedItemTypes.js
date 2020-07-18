const FeedItemType = require('./../models').FeedItemType;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await FeedItemType.findAll({});

      return res.status(200).send(payload);
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching feed item types.'
      });
    }
  }
};