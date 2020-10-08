const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('./../controllers/users');
const verifyToken = passport.authenticate('jwt', { session: false });

if (process.env.NODE_ENV === 'development') {
  router.get('/', users.findAll);
}

router.get('/:id', verifyToken, users.findById);
router.post('/login', users.login);
router.post('/create', users.create);

module.exports = router;
