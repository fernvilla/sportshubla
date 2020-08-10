const express = require('express');
const router = express.Router();
const twitterAccounts = require('./../controllers/twitterAccounts');

router.get('/', twitterAccounts.findAll);

module.exports = router;
