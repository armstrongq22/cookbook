const express = require('express');
const router = express.Router();
const RecipePost = require('../models/recipePost');

router.get('/', (req, res) => {

    RecipePost.find({})
        .then((data) => {
            console.log('Data: ' + data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ' + error);
        });
});

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