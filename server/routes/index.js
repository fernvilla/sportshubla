const express = require('express');
const router = express.Router();

const tweets = require('./../controllers/tweets');
const teams = require('./../controllers/teams');
const leagues = require('./../controllers/leagues');
const twitterAccounts = require('./../controllers/twitterAccounts');

// Tweet Routes
router.get('/api/tweets', tweets.findAll);

// Team Routes
router.get('/api/teams', teams.findAll);

// League Routes
router.get('/api/leagues', leagues.findAll);

// Twitter Account Routes
router.get('/api/twitteraccounts', twitterAccounts.findAll);

module.exports = router;
