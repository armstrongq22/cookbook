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

module.exports = RecipePost;