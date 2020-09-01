const Article = require('./../db/models').Article;
const Tweet = require('./../db/models').Tweet;
const YoutubeVideo = require('./../db/models').YoutubeVideo;
const { Op } = require('sequelize');

module.exports = {
  searchAll: async (req, res) => {
    try {
      const { query } = req.body;

      const searchArticles = async () => {
        try {
          return await Article.findAll({
            where: {
              [Op.or]: [
                { title: { [Op.iLike]: `%${query}%` } },
                { summary: { [Op.iLike]: `%${query}%` } }
              ]
            }
          });
        } catch (error) {
          return error;
        }
      };

      const searchTweets = async () => {
        try {
          return await Tweet.findAll({
            where: {
              [Op.or]: [
                { text: { [Op.iLike]: `%${query}%` } }
                // { summary: { [Op.iLike]: `%${query}%` } }
              ]
            }
          });
        } catch (error) {
          return error;
        }
      };

      const searchVideos = async () => {
        try {
          return await YoutubeVideo.findAll({
            where: {
              [Op.or]: [
                { title: { [Op.iLike]: `%${query}%` } },
                { description: { [Op.iLike]: `%${query}%` } }
              ]
            }
          });
        } catch (error) {
          return error;
        }
      };

      const [articles, tweets, videos] = await Promise.all([
        searchArticles(),
        searchTweets(),
        searchVideos()
      ]);

      return res.status(200).send({
        payload: {
          articles,
          tweets,
          videos
        }
      });
    } catch (error) {
      return res.status(500).send({
        payload: {},
        message: error.message || 'There was an error searching database.',
        error
      });
    }
  }
};
