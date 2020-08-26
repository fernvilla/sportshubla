const Article = require('./../db/models').Article;
const db = require('./../db/models');
const { Op } = require('sequelize');

(async () => {
  try {
    await db.sequelize.authenticate();

    const articles = await Article.findAll({
      where: {
        publishedDate: {
          [Op.lte]: db.sequelize.literal("NOW() - INTERVAL '30d'")
        }
      }
    });

    const deleteArticle = async article => {
      try {
        if (article) await article.destroy();
      } catch (err) {
        console.error(`deleteArticle error: ${err}`);
      }
    };

    await Promise.all(articles.map(article => deleteArticle(article)));

    db.sequelize.close();
  } catch (err) {
    console.error(`deleteArticles error: ${err}`);

    db.sequelize.close();
  }
})();
