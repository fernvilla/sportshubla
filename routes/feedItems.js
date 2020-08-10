const express = require('express');
const router = express.Router();
const feedItems = require('./../controllers/feedItems');

router.get('/', feedItems.findAll);

module.exports = router;
