const Article = require('./../db/models').Article;
const NewsSource = require('./../db/models').NewsSource;
const Team = require('./../db/models').Team;
const FeedItem = require('./../db/models').FeedItem;
const { Op } = require('sequelize');
const db = require('./../db/models');

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await Article.findAll({
        include: [
          {
            model: NewsSource,
            as: 'newsSource',
            include: { model: Team, as: 'team' }
          }
        ],
        order: [['publishedDate', 'DESC']]
      });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        payload: [],
        message: error.message || 'There was an error fetching articles.'
      });
    }
  },

  findAllByTeamId: async (req, res) => {
    try {
      const payload = await Article.findAll({
        include: [
          {
            model: NewsSource,
            as: 'newsSource',
            where: { teamId: req.params.id },
            include: { model: Team, as: 'team' }
          }
        ],
        order: [['publishedDate', 'DESC']]
      });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        payload: [],
        message: error.message || 'There was an error fetching articles.'
      });
    }
  },

  findByLastDay: async (req, res) => {
    try {
      const payload = await Article.findAll({
        include: [
          { model: NewsSource, as: 'newsSource', include: { model: Team, as: 'team' } },
          { model: FeedItem, as: 'feedItem', include: { model: Team, as: 'team' } }
        ],
        where: {
          publishedDate: {
            [Op.gte]: db.sequelize.literal("NOW() - INTERVAL '1d'")
          }
        },
        order: [['publishedDate', 'DESC']]
      });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        payload: [],
        message: error.message || 'There was an error fetching articles.'
      });
    }
  }
};
