const express = require('express');
const router = express.Router();

router.use('/articles', require('./articles'));
router.use('/newssources', require('./newsSources'));
router.use('/newsfeeds', require('./newsFeeds'));
router.use('/search', require('./search'));
router.use('/teams', require('./teams'));
router.use('/tweets', require('./tweets'));
router.use('/twitteraccounts', require('./twitterAccounts'));
router.use('/users', require('./users'));
router.use('/youtubevideos', require('./youtubeVideos'));
router.use('/youtubeaccounts', require('./youtubeAccounts'));

module.exports = router;
