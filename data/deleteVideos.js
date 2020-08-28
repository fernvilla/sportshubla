const YoutubeVideo = require('./../db/models').YoutubeVideo;
const db = require('./../db/models');
const { Op } = require('sequelize');

(async () => {
  try {
    await db.sequelize.authenticate();

    const videos = await YoutubeVideo.findAll({
      where: {
        publishedDate: {
          [Op.lte]: db.sequelize.literal("NOW() - INTERVAL '30d'")
        }
      }
    });

    const deleteVideo = async video => {
      try {
        if (video) await video.destroy();
      } catch (err) {
        console.error(`deleteVideo error: ${err}`);
      }
    };

    await Promise.all(videos.map(video => deleteVideo(video)));

    db.sequelize.close();
  } catch (err) {
    console.error(`deleteVideos error: ${err}`);

    db.sequelize.close();
  }
})();
