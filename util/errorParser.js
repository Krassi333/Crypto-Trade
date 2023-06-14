function errorParser(err) {
    if (err.type == 'ValidationError') {
        return Object.values(err.errors).map(v => v.message);
    } else if (Array.isArray(err)) {
        return err.map(v => v.msg);
    } else {
        return err.message.split('/n')
    }
};

module.exports = errorParser;