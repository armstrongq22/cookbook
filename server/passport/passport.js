const passport = require('passport');
const User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.email);
});
  
passport.deserializeUser(function(email, done) {
    User.findOne({email}, function(err, user) {
        done(err, user);
    });
});


// Strategies
const SignupStrategy = require('./SignupStrategy');
const SinginStrategy = require('./SigninStrategy');


passport.use('local-signup', SignupStrategy);
passport.use('local-signin', SinginStrategy);


module.exports = passport;
