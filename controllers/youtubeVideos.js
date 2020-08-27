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
  }
};
