const Strategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');


const SigninStrategy = new Strategy({usernameField: 'email'}, function(email, password, done) {
    User.findOne({email}).lean().exec((err, user) => {
        if(err) return done(err, null);
        if(!user) return done('User does not exist', null);
        
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if(!isPasswordValid) return done('Email or Password is incorrect');

        return done(null, user);
    });
});

module.exports = SigninStrategy;