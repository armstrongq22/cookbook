const express = require('express');
const router = express.Router();

const User = require('../models/user');
const RP = require('../models/recipePost');
const upload = require('../multer/multer');


// Retrieve recipe posts from DB
router.get('/posts', (req, res) => {
    RP.RecipePost.find({})
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

    const newRecipePost = new RP.RecipePost({
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
