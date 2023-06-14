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

async function login(email, password, req) {
    if (email == '' || password == '') {
        throw new Error('All fields are required!');
    }

    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
console.log(user);
    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const passCheck = await bcrypt.compare(password, user.password);
    console.log(password);
    console.log(user.password);
    console.log(passCheck);
    if (!passCheck) {
        throw new Error('Invalid email or password!');
    }

    const token = createToken(user);
    return token;
}

module.exports = {
    register,
    login,
    verifyToken,
    getUserEmail,
    getAllMyPosts,
    getUserName
}