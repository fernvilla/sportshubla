const express = require('express');
const router = express.Router();
const youtubeAccounts = require('./../controllers/youtubeAccounts');

router.get('/', youtubeAccounts.findAll);

module.exports = router;
