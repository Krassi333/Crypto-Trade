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

function createToken(user) {
    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }

    const token = jwt.sign(payload, secret);
    return token;
};

function verifyToken(token) {
    return jwt.verify(token, secret);
}

async function getUserEmail(id) {
    const user = await User.findById(id).collation({ locale: 'en', strength: 2 }).lean();
    //console.log('getUserEmail '+user.email);
    return user.email;
};

async function getAllMyPosts(id) {
    return Post.find({ author: id }).collation({ locale: 'en', strength: 2 }).lean();
}

async function getUserName(id) {
    const user = await User.findById(id).collation({ locale: 'en', strength: 2 }).lean();
    const fullName = user.firstName + ' ' + user.lastName;
   
    return fullName;
}

module.exports = {
    register,
    login,
    verifyToken,
    getUserEmail,
    getAllMyPosts,
    getUserName
}