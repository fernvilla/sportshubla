const express = require('express');
const router = express.Router();
const leagues = require('./../controllers/leagues');

router.get('/', leagues.findAll);

module.exports = router;
