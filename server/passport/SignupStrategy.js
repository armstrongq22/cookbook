const Strategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);


const SignupStrategy = new Strategy({passReqToCallback: true, usernameField: 'email'}, function(req, email, password, done) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    console.log('4.1');
    
    User.findOne({email}).lean().exec((err, user) => {
        if(err) return done(err, null);
        if(user) return done('User already exists', null);
        console.log('4.2');
        const encryptedPassword = bcrypt.hashSync(password, salt);
        let newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email,
            password: encryptedPassword,
        })
        console.log('4.3');
        newUser.save((error, inserted) => {
            if(error) return done(error, null);
            console.log('4.4');
            return done(null, inserted);
        });
    });
});

module.exports = SignupStrategy;
