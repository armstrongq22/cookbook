const express = require('express');
const router = express.Router();
const RecipePost = require('../models/recipePost');

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