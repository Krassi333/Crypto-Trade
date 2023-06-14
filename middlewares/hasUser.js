module.exports = () => (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        res.locals.user = true;
    } else {
        res.locals.user = false;

    }
    next();
}