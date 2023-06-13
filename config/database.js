const mongoose = require('mongoose');

const connecting_string = 'mongodb://127.0.0.1:27017/CryptoTest';

module.exports = async (app) => {
    try {
        await mongoose.connect(connecting_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database is connected!');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}