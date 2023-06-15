const router = require('express').Router();

router.get('/', (req, res) => {
    const user = req.cookies.token;

    res.render('home', {
        title: "Home Page",
        user
    });

});

module.exports = router;