require('dotenv').config();

const YoutubeAccount = require('./../db/models').YoutubeAccount;
const YoutubeVideo = require('./../db/models').YoutubeVideo;
const db = require('./../db/models');
const fetch = require('isomorphic-unfetch');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

(async () => {
  try {
    await db.sequelize.authenticate();

    const accounts = await YoutubeAccount.findAll();

    const fetchAndMapVideos = async account => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${account.channelId}&maxResults=20&order=date&key=${process.env.YOUTUBE_API_KEY}`
        );
        const data = await res.json();

        const createVideo = async video => {
          const { id, snippet } = video;
          const newVideo = {
            title: entities.decode(snippet.title),
            youtubeAccountId: account.id,
            publishedDate: snippet.publishedAt || new Date(),
            videoId: id.videoId,
            description: entities.decode(snippet.description),
            thumbnail: snippet.thumbnails.high.url
          };

          const [dbVideo, created] = await YoutubeVideo.findCreateFind({
            where: { videoId: newVideo.videoId },
            defaults: newVideo
          });

          if (created) console.log('video created', dbVideo.title);
        };

        await Promise.all(data.items.map(createVideo));
      } catch (err) {
        console.error('fetchAndMapVideos err', err);
        throw new Error(err);
      }
    };

    await Promise.all(accounts.map(account => fetchAndMapVideos(account)));

    db.sequelize.close();
  } catch (error) {
    console.error('main fetch tweets error(s)', error);
    db.sequelize.close();
  }
})();
