const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const RecipePostSchema = new Schema({
    title: String,
    body: String,
    instructions: String,
    imageData: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: new Date().toISOString().slice(0,10)
    }
});

// Model
const RecipePost = mongoose.model('RecipePost', RecipePostSchema);

module.exports = RecipePost;