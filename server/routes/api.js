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
})

module.exports = router;