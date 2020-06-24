const express = require('express');
const router = express.Router();

const tweets = require('./../controllers/tweets');
const teams = require('./../controllers/teams');
const leagues = require('./../controllers/leagues');

// Tweet Routes
router.get('/api/tweets', tweets.findAll);

// Team Routes
router.get('/api/teams', teams.findAll);

// League Routes
router.get('/api/leagues', leagues.findAll);

module.exports = router;
