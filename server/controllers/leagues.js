const League = require('./../models').League;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await League.findAll({});

      return res.status(200).send(payload);
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching leagues.'
      });
    }
  }
};
