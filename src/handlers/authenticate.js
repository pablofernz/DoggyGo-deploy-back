let passport = require('passport')
require("dotenv").config();
const { createUserController } = require('../controllers/userControllers')
const { User } = require('../db.js')
// const bcrypt = require('bcrypt');


passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})


var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  scope: ['profile', 'email'],
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/google/create"
},

  async function (accessToken, refreshToken, profile, cb) {

    const existingUser = await User.findOne({
      where: {
        email: profile.emails[0].value
      }
    });

    if (existingUser) {
      // User already exists, proceed to log them in
      cb(null, existingUser);
    } else {
      const user = {
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      }

      //registro usuario  
      await createUserController(user)
      cb(null, profile)
    }

  }
));