const NewsSource = require('./../db/models').NewsSource;
const RssFeed = require('./../db/models').RssFeed;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await NewsSource.findAll({
        include: { model: RssFeed, as: 'rssFeeds' }
      });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching news sources.'
      });
    }
  }
};
