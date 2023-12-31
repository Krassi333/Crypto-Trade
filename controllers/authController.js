const { register, login } = require('../services/userServices');
const errorParser = require('../util/errorParser');

const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register', {
        title: "Register Page"
    });
});

router.post('/register', async (req, res) => {
    //console.log(req.body);

    try {
       
        if (req.body.password != req.body.rePass) {
            throw new Error('Passwords don\'t match!');
        }

        const token = await register(req.body);
        res.cookie('token', token);
        res.redirect('/')
    } catch (err) {

        const errors = errorParser(err);

        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                email: req.body.email,
                username: req.body.username
            }
        })
    }
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page'
    });
});

router.post('/login', async (req, res) => {
    try {

        const token = await login(req.body.email, req.body.password, req);

        res.cookie('token', token);
        res.redirect('/');

    } catch (err) {
        const errors = errorParser(err);
        res.render('login', {
            title: 'Login Page',
            body:{
                email:req.body.email
            },
            errors
        })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = router;