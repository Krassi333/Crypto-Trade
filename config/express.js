const cookieParser = require('cookie-parser');
const { urlencoded } = require('express');
const handlebars = require('express-handlebars');
const express=require('express');
const session = require('../middlewares/session');
const hasUser = require('../middlewares/hasUser');

module.exports = (app) => {
    const hbs = handlebars.create({
        extname: '.hbs'
    });

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use('/static', express.static('static'));
    app.use(urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session());
    app.use(hasUser());

   
}