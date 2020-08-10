const express = require('express');
const router = express.Router();
const teams = require('./../controllers/teams');

router.get('/', teams.findAll);
router.get('/slug/:slug', teams.findBySlug);

module.exports = router;
