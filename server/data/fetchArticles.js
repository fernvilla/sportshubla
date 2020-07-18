const db = require('./../models');
const NewsSource = require('./../models').NewsSource;
const RssFeed = require('./../models').RssFeed;
const FeedItemType = require('./../models').FeedItemType;
const FeedItem = require('./../models').FeedItem;
const Team = require('./../models').Team;
const Article = require('./../models').Article;
const Parser = require('rss-parser');
const fetch = require('isomorphic-unfetch');

const parser = new Parser();

(async () => {
  try {
    await db.sequelize.authenticate();

    const feeds = await RssFeed.findAll({
      include: { model: NewsSource, as: 'newsSource', include: { model: Team, as: 'team' } }
    });

    const fetchAndMapArticles = async (rssFeed, feedItemType) => {
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
            title: article.title,
            publishedDate: article.pubDate,
            url: article.link,
            image: article.enclosure ? article.enclosure.url : null,
            author: article.author,
            summary: article.content,
            newsSourceId: rssFeed.newsSource.id
          };

          const [dbArticle, created] = await Article.findCreateFind({
            where: { url: newArticle.url },
            defaults: newArticle
          });

          if (created) {
            const feedItem = await FeedItem.create({
              feedItemTypeId: feedItemType.id,
              teamId: rssFeed.newsSource.team.id
            });

            dbArticle.feedItemId = feedItem.id;

            await dbArticle.save();
          }
        };

        const feed = await parser.parseURL(rssFeed.url);

        await Promise.all(feed.items.map(createArticle));
      } catch (err) {
        console.error('fetchAndMapArticles err', err);
        throw new Error(err);
      }
    };

    const feedItemType = await FeedItemType.findOne({ where: { type: 'article' } });

    await Promise.all(feeds.map(feed => fetchAndMapArticles(feed, feedItemType)));

    db.sequelize.close();
  } catch (err) {
    console.error('main fetch articles error(s)', err);
    db.sequelize.close();
  }
})();
