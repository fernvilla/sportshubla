const express = require('express');
const router = express.Router();
const divisions = require('./../controllers/divisions');

router.get('/', divisions.findAll);

module.exports = router;
