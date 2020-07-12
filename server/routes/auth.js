const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');


// Authenticates with cookie
router.get('/authenticate', (req, res) => {
    if(req.isAuthenticated()) {
        res.json({message: 'User is authenticated'})
    } else {
        res.status(500).json({message: 'User is not authenticated'});
    }
});

// Logout user
router.post('/logout', (req, res) => {
    req.session = null;
    res.json({message: 'User logout complete'});
});

// Singup user
router.post('/signup', (req, res, next) => {
    console.log('4');
    passport.authenticate('local-signup', function(error, user, info) {
        if(error) {
            return res.status(500).json({ message: error});
        };
        console.log('5');
        // Persistent Login
        req.logIn(user, (error) => {
            if(error) {
                return res.status(500).json({
                    message: error
                });
            }
            console.log('6');
            // TODO: Don't send password with uer
            user.isAuthenticated = true;
            user.password = null;
            return res.json(user);
        });
    })(req, res, next);
});

// Signin user
router.post('/signin', (req, res, next) => {
    passport.authenticate('local-signin', function(error, user, info) {
        if(error) {
            return res.status(500).json({
                message: error
            });
        };
        
        req.logIn(user, (error) => {
            if(error) {
                return res.status(500).json({
                    message: 'Authentication failed',
                    error: error.message
                });
            }

            // TODO: Don't send password with uer
            user.isAuthenticated = true;
            user.password = null;
            return res.json(user);
        });
    })(req, res, next);
});

// Retrieve user details
router.get('/user', (req, res) => {
    return res.json(req.user);
});

module.exports = router;
