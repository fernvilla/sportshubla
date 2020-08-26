const TwitterAccount = require('./../db/models').TwitterAccount;
const Team = require('./../db/models').Team;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await TwitterAccount.findAll({
        include: [{ model: Team, as: 'team' }]
      });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        payload: [],
        message: error.message || 'There was an error fetching twitter accounts.'
      });
    }
  }
};
