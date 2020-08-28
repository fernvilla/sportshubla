const express = require('express');
const router = express.Router();
const tweets = require('./../controllers/tweets');

router.get('/', tweets.findAll);
router.get('/lastday', tweets.findByLastDay);
router.get('/latest', tweets.findByLatest);
router.get('/team/id/:id', tweets.findAllByTeamId);

module.exports = router;
