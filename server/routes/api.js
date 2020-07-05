const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');

const RecipePost = require('../models/recipePost');
const { session } = require('../passport/passport');

// Singup user
router.post('/signup', (req, res, next) => {
    
    passport.authenticate('local-signup', function(error, user, info) {
        if(error) {
            return res.status(500).json({
                message: 'Authentication failed',
                error: error.message
            });
        };
        
        return res.json(user);
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
        
        return res.json(user);
    })(req, res, next);
});

// Retrieve recipe posts from DB
router.get('/posts', (req, res) => {

    RecipePost.find({})
        .then((data) => {
            //console.log('Data: ' + data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ' + error);
        });
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