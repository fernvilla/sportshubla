const RssFeed = require('./../models').RssFeed;
const NewsSource = require('./../models').NewsSource;
const Team = require('./../models').Team;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await RssFeed.findAll({
        include: { model: NewsSource, as: 'newsSource', include: { model: Team, as: 'team' } }
      });

      return res.status(200).send(payload);
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching rss feeds.'
      });
    }
  }
};
