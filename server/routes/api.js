const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');

const RecipePost = require('../models/recipePost');
const { session } = require('../passport/passport');

// Singup user
router.post('/signup', (req, res, next) => {
    
    passport.authenticate('local-signup', function(error, user, info) {
        if(error) {
            return res.status(500).json({ message: error});
        };
        
        // Persistent Login
        req.logIn(user, (error) => {
            if(error) {
                return res.status(500).json({
                    message: error
                });
            }

            // TODO: Don't send password with uer
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

// Retrieve recipe posts from DB
router.get('/posts', (req, res) => {
    if(req.isAuthenticated()) {
        RecipePost.find({})
            .then((data) => {
                //console.log('Data: ' + data);
                res.json(data);
            })
            .catch((error) => {
                console.log('Error: ' + error);
            });
    } else {
        res.status(500).json({message: 'User not authenticated'});
    }
});

// Post new recipe post to DB
router.post('/save', (req, res) => {
    const data = req.body;

    const newRecipePost = new RecipePost(data);
    newRecipePost.save((error) => {
        if(error) 
            res.status(500).json({msg: 'Internal server errors'});
        else 
            res.json({msg: 'Your data has been saved'});
    });
});

module.exports = router;