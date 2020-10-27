const express = require('express');
const router = express.Router();
const youtubeVideos = require('./../controllers/youtubeVideos');

router.get('/', youtubeVideos.findAll);
router.post('/paginated', youtubeVideos.findAll);
router.get('/lastday', youtubeVideos.findByLastDay);
router.get('/latest', youtubeVideos.findByLatest);
router.get('/team/id/:id', youtubeVideos.findAllByTeamId);
router.post('/latest/favorites', youtubeVideos.findLatestByFavoriteTeams);

module.exports = router;
