const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/Crypto');

const secret = 'dasnjcnjebweanvwgqeoncbc54321';

async function register(data) {
    const existingEmail = await User.findOne({ email: data.email }).collation({ locale: 'en', strength: 2 });


    if (existingEmail) {
        throw new Error('Email is already registered!');
    }
    //console.log(data);
    const hashedPass = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        username:data.username,
        email: data.email,
        password: hashedPass
    });

    const token = createToken(user);

    return token;

};

module.exports = {
    register,
    login,
    verifyToken,
    getUserEmail,
    getAllMyPosts,
    getUserName
}