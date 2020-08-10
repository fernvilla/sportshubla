const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/articles', require('./articles'));
router.use('/conferences', require('./conferences'));
router.use('/divisions', require('./divisions'));
router.use('/feeditems', require('./feedItems'));
router.use('/feeditemstypes', require('./feedItemTypes'));
router.use('/leagues', require('./leagues'));
router.use('/newssources', require('./newsSources'));
router.use('/rssfeeds', require('./rssFeeds'));
router.use('/teams', require('./teams'));

module.exports = router;
