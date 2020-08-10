const express = require('express');
const router = express.Router();
const rssFeeds = require('./../controllers/rssFeeds');

router.get('/', rssFeeds.findAll);

module.exports = router;
