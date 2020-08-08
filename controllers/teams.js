const Team = require('./../db/models').Team;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await Team.findAll({});

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching teams.'
      });
    }
  },

  findBySlug: async (req, res) => {
    try {
      const payload = await Team.findOne({
        where: { slug: req.params.slug }
      });
      console.log({ payload });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching team.'
      });
    }
  },

  findById: async (req, res) => {
    try {
      const payload = await Team.findOne({
        where: { slug: req.params.id }
      });

      return res.status(200).send({ payload });
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching team.'
      });
    }
  }
};
