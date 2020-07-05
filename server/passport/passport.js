const passport = require('passport');


// Strategies
const SignupStrategy = require('./SignupStrategy');
const SinginStrategy = require('./SigninStrategy');


passport.use('local-signup', SignupStrategy);
passport.use('local-signin', SinginStrategy);


module.exports = passport;