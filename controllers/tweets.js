const Tweet = require('./../db/models').Tweet;
const TwitterAccount = require('./../db/models').TwitterAccount;
const Team = require('./../db/models').Team;
const FeedItem = require('./../db/models').FeedItem;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await Tweet.findAll({
        include: [
          { model: TwitterAccount, as: 'twitterAccount', include: { model: Team, as: 'team' } },
          { model: FeedItem, as: 'feedItem', include: { model: Team, as: 'team' } }
        ],
        order: [['publishedDate', 'DESC']]
      });

      return res.status(200).send(payload);
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching tweets.'
      });
    }
  }
};
