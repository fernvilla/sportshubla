const TwitterAccount = require('./../models').TwitterAccount;
const Team = require('./../models').Team;
const TwitterAccountType = require('./../models').TwitterAccountType;

module.exports = {
  findAll: async (req, res) => {
    try {
      const payload = await TwitterAccount.findAll({
        include: [
          { model: Team, as: 'team' },
          { model: TwitterAccountType, as: 'twitterAccountType' }
        ]
      });

      return res.status(200).send(payload);
    } catch (error) {
      return res.status(500).send({
        message: error.message || 'There was an error fetching twitter accounts.'
      });
    }
  }
};
