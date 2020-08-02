const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('./../db/models').User;

const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY
};

const strategy = new jwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.id);

    if (user) {
      return done(null, user.get({ plain: true }));
    }

    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

module.exports = passport => {
  passport.use(strategy);
};
