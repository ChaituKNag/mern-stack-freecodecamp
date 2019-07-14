const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const User = model('User', new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
}, {
    timestamps: true
}));

module.exports = User;