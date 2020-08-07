const League = require('./../db/models').League;
const Team = require('./../db/models').Team;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await League.findAll({
        include: { model: Team, as: 'teams' },
        order: [['fullName', 'asc']]
      });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        payload: [],
        message: error.message || 'There was an error fetching leagues.'
      });
    }
  }
};
