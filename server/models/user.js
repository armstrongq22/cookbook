const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarColor: {
        type: String,
        default: "#f44336"
    },
    date: {
        type: String,
        default: new Date().toISOString().slice(0,10)
    }
});

// Model
const User = mongoose.model('User', UserSchema);

module.exports = User;