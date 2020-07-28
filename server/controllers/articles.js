const Article = require('./../models').Article;
const NewsSource = require('./../models').NewsSource;
const Team = require('./../models').Team;
const FeedItem = require('./../models').FeedItem;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await Article.findAll({
        include: [
          { model: NewsSource, as: 'newsSource', include: { model: Team, as: 'team' } },
          { model: FeedItem, as: 'feedItem', include: { model: Team, as: 'team' } }
        ],
        order: [['publishedDate', 'DESC']]
      });

      return res.status(200).send(payload);
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching articles.'
      });
    }
  }
};
