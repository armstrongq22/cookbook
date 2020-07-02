const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const RecipePostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model
const RecipePost = mongoose.model('RecipePost', RecipePostSchema);

const data = {
    'title': 'Orange Chicken',
    'body': 'Tastes good!'
};
const newRecipe = new RecipePost(data);
newRecipe.save();

module.exports = RecipePost;