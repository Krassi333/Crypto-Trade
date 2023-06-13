const { Schema, model, Types } = require('mongoose');
const Post = require('./Crypto');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: [5, "Username must be at least 5 characters long!"] },
    email: { type: String, required: true, minlength: [10, "Invalid email!"] },
    password: { type: String, required: true },
    myPosts: { type: [Types.Object], ref: 'Post', default: [] }
});

const User = model('User', userSchema);

module.exports = User;
