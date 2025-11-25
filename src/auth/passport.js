// src/auth/passport.js
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new SteamStrategy({
  returnURL: `${process.env.BASE_URL}/auth/steam/return`,
  realm: process.env.BASE_URL,
  apiKey: process.env.STEAM_API_KEY
}, (identifier, profile, done) => {
  // profile.id is steamid
  process.nextTick(() => done(null, profile));
}));

module.exports = passport;
