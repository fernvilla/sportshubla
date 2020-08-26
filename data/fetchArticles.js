const db = require('./../db/models');
const NewsSource = require('./../db/models').NewsSource;
const RssFeed = require('./../db/models').RssFeed;
const Team = require('./../db/models').Team;
const Article = require('./../db/models').Article;
const Parser = require('rss-parser');
const fetch = require('isomorphic-unfetch');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const parser = new Parser();

const getPathFromUrl = url => url.split(/[?#]/)[0];

(async () => {
  try {
    await db.sequelize.authenticate();

    const feeds = await RssFeed.findAll({
      include: { model: Team, as: 'team' }
    });

    const fetchAndMapArticles = async rssFeed => {
      try {
        if (!rssFeed.isActive) return;

        const res = await fetch(rssFeed.url);

        if (res.status !== 200) {
          return await RssFeed.update(
            { lastStatusCode: res.status },
            { where: { id: rssFeed.id } }
          );
        }

        const createArticle = async article => {
          const newArticle = {
            title: entities.decode(article.title),
            publishedDate: article.pubDate || new Date(),
            url: article.link,
            image: article.enclosure ? getPathFromUrl(article.enclosure.url) : null,
            author: article.author,
            summary: entities.decode(article.content),
            rssFeedId: rssFeed.id
          };

          const [dbArticle, created] = await Article.findCreateFind({
            where: { url: newArticle.url },
            defaults: newArticle
          });

          if (created) console.log('article created', dbArticle.title);
        };

        const feed = await parser.parseURL(rssFeed.url);

        await Promise.all(feed.items.map(createArticle));
      } catch (err) {
        console.error('fetchAndMapArticles err', err);
        throw new Error(err);
      }
    };

    await Promise.all(feeds.map(feed => fetchAndMapArticles(feed)));

    db.sequelize.close();
  } catch (err) {
    console.error('main fetch articles error(s)', err);
    db.sequelize.close();
  }
})();
