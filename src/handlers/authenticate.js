let passport = require('passport')    
require("dotenv").config(); 
const {User} = require('../models/User') 
const { createUserController }= require('../controllers/userControllers') 
// const bcrypt = require('bcrypt');


passport.serializeUser((user, done) => {
    done(null, user.id)
}) 
passport.deserializeUser((user, done) => {
    done(null, user)
})


var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy ({ scope: ['profile', 'email'],
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/create"
  }, 
 
  function  (accessToken, refreshToken, profile, cb) { 
    
   //registro usuario  
   console.log(profile)
   cb(null, profile)    

      // 10 number of salt rounds

const user = {
  googleId: profile.id, 
  email: profile.emails[0].value,
  birthdate: 'null',
  address:'null',
  phone:'null',
  description:'null',
  country:'null',
  state:'null',
  city:'null',
  rol:'null', 
  name:'null',    
 password:'null'
}  

createUserController(user)   

  }
));