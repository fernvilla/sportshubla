require('dotenv').config();

const sendErrorEmail = require('../utils/emails').sendErrorEmail;
const db = require('./../db/models');
const NewsFeed = require('./../db/models').NewsFeed;
const Team = require('./../db/models').Team;
const Article = require('./../db/models').Article;
const NewsFeedType = require('./../db/models').NewsFeedType;
const Parser = require('rss-parser');
const fetch = require('isomorphic-unfetch');
const { newsFeedTypes } = require('../constants');
const { removeHtmlFromString } = require('../utils/strings');
const differenceInDays = require('date-fns').differenceInDays;
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();
const parser = new Parser();

const getPathFromUrl = url => url.split(/[?#]/)[0];

(async () => {
  try {
    await db.sequelize.authenticate();

    const feeds = await NewsFeed.findAll({
      include: [
        { model: Team, as: 'team' },
        {
          model: NewsFeedType,
          as: 'newsFeedType',
          where: {
            name: newsFeedTypes.TYPE_RSS
          }
        }
      ],
      where: { isActive: true }
    });

    const fetchAndMapArticles = async newsFeed => {
      try {
        const res = await fetch(newsFeed.url);

        if (res.status !== 200) {
          sendErrorEmail('Bad news feed status code', {
            url: newsFeed.url,
            statusCode: res.status
          });

          return await NewsFeed.update(
            { lastStatusCode: res.status, isActive: false },
            { where: { id: newsFeed.id } }
          );
        }

        const createArticle = async article => {
          const publishedDate = article.pubDate || new Date();

          if (differenceInDays(new Date(publishedDate), new Date()) < -1) return;

          const newArticle = {
            title: removeHtmlFromString(entities.decode(article.title)),
            publishedDate,
            url: article.link,
            image: article.enclosure ? getPathFromUrl(article.enclosure.url) : null,
            author: article.author,
            summary: removeHtmlFromString(entities.decode(article.content)),
            newsFeedId: newsFeed.id
          };

          const [dbArticle, created] = await Article.findCreateFind({
            where: { url: newArticle.url },
            defaults: newArticle
          });

          if (created) console.log('article created', dbArticle.title);
        };

        const feed = await parser.parseURL(newsFeed.url);

        await Promise.all(feed.items.map(createArticle));
      } catch (err) {
        return err;
      }
    };

    await Promise.all(feeds.map(feed => fetchAndMapArticles(feed)));

    db.sequelize.close();
  } catch (err) {
    console.error('main fetch articles error(s)', err);
    sendErrorEmail('Fetch Articles error', { err });
    db.sequelize.close();
  }
})();
