const Article = require('./../db/models').Article;
const NewsFeed = require('./../db/models').NewsFeed;
const Team = require('./../db/models').Team;
const NewsSource = require('./../db/models').NewsSource;
const { Op } = require('sequelize');
const db = require('./../db/models');

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await Article.findAll({
        include: [
          {
            model: NewsFeed,
            as: 'newsFeed',
            include: [
              { model: Team, as: 'team' },
              { model: NewsSource, as: 'newsSource' }
            ]
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

  findAllByPaginated: async (req, res) => {
    try {
      const {
        body: { page = 0, size = 10 }
      } = req;

      const offset = page * size;
      const limit = size;

      const payload = await Article.findAll({
        include: [
          {
            model: NewsFeed,
            as: 'newsFeed',
            include: [
              { model: Team, as: 'team' },
              { model: NewsSource, as: 'newsSource' }
            ]
          }
        ],
        order: [['publishedDate', 'DESC']],
        offset,
        limit
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
            model: NewsFeed,
            as: 'newsFeed',
            where: { teamId: req.params.id },
            include: [
              { model: Team, as: 'team' },
              { model: NewsSource, as: 'newsSource' }
            ]
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
          {
            model: NewsFeed,
            as: 'newsFeed',
            include: [
              { model: Team, as: 'team' },
              { model: NewsSource, as: 'newsSource' }
            ]
          }
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
  },

  findByLatest: async (req, res) => {
    try {
      const payload = await Article.findAll({
        include: [
          {
            model: NewsFeed,
            as: 'newsFeed',
            include: [
              { model: Team, as: 'team' },
              { model: NewsSource, as: 'newsSource' }
            ]
          }
        ],
        order: [['publishedDate', 'DESC']],
        limit: 20
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
