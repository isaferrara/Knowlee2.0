const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_KEY,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback'
},
  async (_, __, { id, emails, photos }, done) => {
    const user = await User.findOne({ googleID: id })

    if (!user) {
      const newUser = await User.create({
        googleID: id,
        email: emails[0].value,
        image: photos[0].value
      })
      done(null, newUser)
      return;
    }

    done(null, user);
  }
));
