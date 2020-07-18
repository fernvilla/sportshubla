const Division = require('./../models').Division;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await Division.findAll({});

      return res.status(200).send(payload);
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching divisions.'
      });
    }
  }
};