const express = require('express');
const router = express.Router();

router.use('/articles', require('./articles'));
router.use('/newssources', require('./newsSources'));
router.use('/rssfeeds', require('./rssFeeds'));
router.use('/teams', require('./teams'));
router.use('/tweets', require('./tweets'));
router.use('/twitteraccounts', require('./twitterAccounts'));
router.use('/users', require('./users'));

module.exports = router;
