const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');

const RecipePost = require('../models/recipePost');
const { session } = require('../passport/passport');
const upload = require('../multer/multer');

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
router.post('/save', upload.single('imageData'), (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const inst = req.body.instructions;

    // Just store image name
    const imageData = req.file.path.substr(req.file.path.lastIndexOf('\\')+1);

    const newRecipePost = new RecipePost({
        title: title,
        body: body,
        instructions: inst,
        imageData: imageData
    });
    newRecipePost.save()
        .then((result) => {
            console.log(result);
            res.json({
                success: true,
                msg: 'Your data has been saved'
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({msg: 'Internal server errors'});
        });
});

module.exports = router;