const express = require('express');
const router = express.Router();
const articles = require('./../controllers/articles');

router.get('/', articles.findAll);
router.get('/lastday', articles.findByLastDay);
router.get('/latest', articles.findByLatest);
router.get('/team/id/:id', articles.findAllByTeamId);

module.exports = router;
