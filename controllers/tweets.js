const Tweet = require('./../db/models').Tweet;
const TwitterAccount = require('./../db/models').TwitterAccount;
const Team = require('./../db/models').Team;
const FeedItem = require('./../db/models').FeedItem;
const { Op } = require('sequelize');
const db = require('./../db/models');

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await Tweet.findAll({
        include: [
          {
            model: TwitterAccount,
            as: 'twitterAccount',
            include: { model: Team, as: 'team' }
          }
        ],
        order: [['publishedDate', 'DESC']]
      });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        payload: [],
        message: error.message || 'There was an error fetching tweets.'
      });
    }
  },

  findAllByTeamId: async (req, res) => {
    try {
      const payload = await Tweet.findAll({
        include: [
          {
            model: TwitterAccount,
            as: 'twitterAccount',
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
        message: error.message || 'There was an error fetching tweets.'
      });
    }
  },

  findByLastDay: async (req, res) => {
    try {
      const payload = await Tweet.findAll({
        include: [
          { model: TwitterAccount, as: 'twitterAccount', include: { model: Team, as: 'team' } }
          // { model: FeedItem, as: 'feedItem', include: { model: Team, as: 'team' } }
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
        message: error.message || 'There was an error fetching tweets.'
      });
    }
  }
};
