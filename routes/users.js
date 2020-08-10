const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('./../controllers/users');
const verifyToken = passport.authenticate('jwt', { session: false });

router.get('/', verifyToken, users.findAll);
router.post('/login', users.login);

module.exports = router;
