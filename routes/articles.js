const express = require('express');
const router = express.Router();
const articles = require('./../controllers/articles');

router.get('/', articles.findAll);
router.post('/paginated', articles.findAllByPaginated);
router.get('/lastday', articles.findByLastDay);
router.get('/latest', articles.findByLatest);
router.get('/team/id/:id', articles.findAllByTeamId);
router.post('/latest/favorites', articles.findLatestByFavoriteTeams);

module.exports = router;
