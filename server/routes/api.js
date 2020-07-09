const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');

const User = require('../models/user');
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
    const email = req.user.email;
    const firstName = req.user.firstName;

    console.log(email);
    console.log(firstName);
    // Just store image name
    const imageData = req.file.path.substr(req.file.path.lastIndexOf('\\')+1);

    const newRecipePost = new RecipePost({
        account: email,
        accountName: firstName,
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

// Update Avatar Color
router.post('/avatarColor', (req, res) => {
    console.log(req.body.newColor);
    User.updateOne({email: req.user.email}, { 
        $set: {
            avatarColor: req.body.newColor 
        } 
    })
    .then((data) => {
        //console.log(data);
        res.json({
            success: true,
            msg: 'Your profile has been successfully updated'
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({msg: 'Internal server errors'});
    });
});

// Retrieves avatar color for post
router.post('/getAvatarColor', (req, res) => {
    User.findOne({email: req.body.email})
        .then((data) => {
            res.json({
                success: true,
                color: data.avatarColor
            });
        })
        .catch((error) => {
            console.log('Error: ' + error);
        });
});

module.exports = router;
