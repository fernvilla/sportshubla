const YoutubeVideo = require('./../db/models').YoutubeVideo;
const YoutubeAccount = require('./../db/models').YoutubeAccount;
const Team = require('./../db/models').Team;
const { Op } = require('sequelize');
const db = require('./../db/models');

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await YoutubeVideo.findAll({
        include: [
          {
            model: YoutubeAccount,
            as: 'youtubeAccount',
            include: { model: Team, as: 'team' }
          }
        ],
        order: [['publishedDate', 'DESC']]
      });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        payload: [],
        message: error.message || 'There was an error fetching youtube videos.'
      });
    }
  },

  findAllByFavoriteTeams: async (req, res) => {
    try {
      const payload = await YoutubeVideo.findAll({
        include: [
          {
            model: YoutubeAccount,
            as: 'youtubeAccount',
            include: { model: Team, as: 'team' }
          }
        ],
        order: [['publishedDate', 'DESC']],
        where: { id: req.body.ids }
      });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        payload: [],
        message: error.message || 'There was an error fetching youtube videos.'
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

      const payload = await YoutubeVideo.findAll({
        include: [
          {
            model: YoutubeAccount,
            as: 'youtubeAccount',
            include: { model: Team, as: 'team' }
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
      const payload = await YoutubeVideo.findAll({
        include: [
          {
            model: YoutubeAccount,
            as: 'youtubeAccount',
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
        message: error.message || 'There was an error fetching youtube videos.'
      });
    }
  },

  findByLastDay: async (req, res) => {
    try {
      const payload = await YoutubeVideo.findAll({
        include: [
          { model: YoutubeAccount, as: 'youtubeAccount', include: { model: Team, as: 'team' } }
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
        message: error.message || 'There was an error fetching youtube videos.'
      });
    }
  },

  findByLatest: async (req, res) => {
    try {
      const payload = await YoutubeVideo.findAll({
        include: [
          { model: YoutubeAccount, as: 'youtubeAccount', include: { model: Team, as: 'team' } }
        ],
        order: [['publishedDate', 'DESC']],
        limit: 20
      });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        payload: [],
        message: error.message || 'There was an error fetching youtube videos.'
      });
    }
  },

  findLatestByFavoriteTeams: async (req, res) => {
    try {
      const payload = await YoutubeVideo.findAll({
        include: [
          {
            model: YoutubeAccount,
            as: 'youtubeAccount',
            include: { model: Team, as: 'team' },
            where: { teamId: req.body.ids }
          }
        ],
        order: [['publishedDate', 'DESC']],
        limit: 20
      });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        payload: [],
        message: error.message || 'There was an error youtube videos.'
      });
    }
  }
};
