const express = require('express');
const router = express.Router();
const youtubeVideos = require('./../controllers/youtubeVideos');

router.get('/', youtubeVideos.findAll);
router.get('/lastday', youtubeVideos.findByLastDay);
router.get('/team/id/:id', youtubeVideos.findAllByTeamId);

module.exports = router;
