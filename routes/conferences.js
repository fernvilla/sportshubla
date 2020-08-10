const express = require('express');
const router = express.Router();
const conferences = require('./../controllers/conferences');

router.get('/', conferences.findAll);

module.exports = router;
