const FeedItemType = require('./../db/models').FeedItemType;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await FeedItemType.findAll({});

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        payload: [],
        message: error.message || 'There was an error fetching feed item types.'
      });
    }
  }
};
