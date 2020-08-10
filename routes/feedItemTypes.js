const express = require('express');
const router = express.Router();
const feedItemTypes = require('./../controllers/feedItemTypes');

router.get('/', feedItemTypes.findAll);

module.exports = router;
