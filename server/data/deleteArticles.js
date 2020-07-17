const Article = require('./../models').Article;
const FeedItem = require('./../models').FeedItem;
const db = require('./../models');
const { Op } = require('sequelize');

(async () => {
  try {
    await db.sequelize.authenticate();

    const articles = await Article.findAll({
      where: {
        publishedDate: {
          [Op.gte]: db.sequelize.literal("NOW() - INTERVAL '7d'")
        }
      }
    });

    const deleteFeedItemAndArticle = async article => {
      try {
        const feedItem = await FeedItem.findOne({ where: { id: article.feedItemId } });

        if (feedItem) await feedItem.destroy();
        if (article) await article.destroy();
      } catch (err) {
        console.error(`deleteFeedItemAndArticle error: ${err}`);
      }
    };

    await Promise.all(articles.map(article => deleteFeedItemAndArticle(article)));

    db.sequelize.close();
  } catch (err) {
    console.error(`deleteArticles error: ${err}`);

    db.sequelize.close();
  }
})();
