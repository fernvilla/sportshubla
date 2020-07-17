const express = require('express');
const router = express.Router();

const tweets = require('./../controllers/tweets');
const teams = require('./../controllers/teams');
const leagues = require('./../controllers/leagues');
const twitterAccounts = require('./../controllers/twitterAccounts');
const feedItemTypes = require('./../controllers/feedItemTypes');
const feedItems = require('./../controllers/feedItems');
const conferences = require('./../controllers/conferences');
const divisions = require('./../controllers/divisions');
const newsSources = require('./../controllers/newsSources');
const rssFeeds = require('./../controllers/rssFeeds');
const articles = require('./../controllers/articles');

// Team Routes
router.get('/api/teams', teams.findAll);

// League Routes
router.get('/api/leagues', leagues.findAll);

// Conference Routes
router.get('/api/conferences', conferences.findAll);

// Division Routes
router.get('/api/divisions', divisions.findAll);

// Twitter Account Routes
router.get('/api/twitteraccounts', twitterAccounts.findAll);

// Tweet Routes
router.get('/api/tweets', tweets.findAll);

// Feed Item Routes
router.get('/api/feeditems', feedItems.findAll);

// Feed Item Type Routes
router.get('/api/feeditemtypes', feedItemTypes.findAll);

// News Source Routes
router.get('/api/newssources', newsSources.findAll);

// Rss Feeds Routes
router.get('/api/rssfeeds', rssFeeds.findAll);

// Articles Routes
router.get('/api/articles', articles.findAll);

module.exports = router;
