import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import CONFIG from './config.js';
import User from '../models/userModel.js';
passport.use(
  new GoogleStrategy(
    {
      clientID: CONFIG.GOOGLE_CLIENT_ID,
      clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
      callbackURL: CONFIG.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ googleId: id })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

export default passport;
