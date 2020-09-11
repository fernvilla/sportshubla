const express = require('express');
const router = express.Router();
const newsFeeds = require('./../controllers/newsFeeds');

router.get('/', newsFeeds.findAll);

module.exports = router;
