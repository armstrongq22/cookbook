const express = require('express');
const router = express.Router();

const User = require('../models/user');
const RP = require('../models/recipePost');
const upload = require('../multer/multer');


// Retrieve recipe posts from DB
router.get('/posts', (req, res) => {
    RP.RecipePost.find({})
        .then((data) => {
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
    const ingr = req.body.ingredients;
    const inst = req.body.instructions;
    const email = req.user.email;
    const firstName = req.user.firstName;
    const lastName = req.user.lastName;

    console.log(email);
    console.log(firstName);
    // Just store image name
    const imageData = req.file.path.substr(req.file.path.lastIndexOf('\\')+1);

    const newRecipePost = new RP.RecipePost({
        account: email,
        accountName: firstName + ' ' + lastName,
        title: title,
        body: body,
        ingredients: ingr,
        instructions: inst,
        imageData: imageData
    });

    // Saves Recipe Post
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
    
    // Saves Recipe Post in User
    User.findOne({email: req.user.email})
        .then((user) => {
           user.posts.push(newRecipePost);
           user.save();
        })
        .catch((error) => {
            console.log(error);
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
    .then(() => {
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

// Adds a post to a users favorites
router.post('/favorite', (req, res) => {
    User.findOne({email: req.user.email})
        .then((user) => {
            RP.RecipePost.findById({_id: req.body.id})
                .then((post) => {
                    if (user.favorites.filter(function(e) { return e._id == req.body.id; }).length === 0) {
                        user.favorites.push(post);
                        user.save();
                    } else {
                        user.favorites.remove(post);
                        user.save();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({msg: 'Internal server errors'});
                });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({msg: 'Internal server errors'});
        });
});

// Retrieve favorite posts from DB
router.get('/getFavorites', (req, res) => {
    User.findOne({email: req.user.email})
    .then((user) => {
        res.json({
            success: true,
            posts: user.favorites
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({msg: 'Internal server errors'});
    });
});

// Retrieve user posts
router.get('/getUserRecipes', (req, res) => {
    User.findOne({email: req.user.email})
    .then((user) => {
        res.json({
            success: true,
            posts: user.posts
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({msg: 'Internal server errors'});
    });
});

// Retrieve expanded recipe
router.post('/getRecipeExpanded', (req, res) => {
    RP.RecipePost.findById({_id: req.body.id})
        .then((data) => {
            res.json({
                success: true,
                post: data
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({msg: 'Internal server errors'});
        });
});

module.exports = router;
