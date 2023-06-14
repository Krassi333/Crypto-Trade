const { register, login } = require('../services/userServices');
const errorParser = require('../util/errorParser');

const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register', {
        title: "Register Page"
    });
});

module.exports = router;