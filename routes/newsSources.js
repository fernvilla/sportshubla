const express = require('express');
const router = express.Router();
const newsSources = require('./../controllers/newsSources');

router.get('/', newsSources.findAll);

module.exports = router;
