const Crypto = require('../models/Crypto');
const User = require('../models/User');


async function getAllCrypto() {
    return Crypto.find({}).collation({ locale: 'en', strength: 2 }).lean();
}

async function createCrypto(data) {
    console.log('data in service ' + data);

    return Crypto.create(data);
};

async function getById(id) {
    return Crypto.findById(id).collation({ locale: 'en', strength: 2 }).lean();
}

async function getCryptoAuthor(_id) {
    return User.findOne({ _id });
}

async function deleteCrypto(id) {
    return Crypto.findByIdAndDelete(id);
};

async function editCrypto(id, data) {
    let crypto = await Crypto.findById(id).collation({ locale: 'en', strength: 2 });

    crypto.name = data.name;
    crypto.imageUrl = data.imageUrl;
    crypto.price = data.price;
    crypto.description = data.description;
    crypto.paymentMethod = data.paymentMethod;

    return crypto.save();
}

async function buy(id, user) {
    const crypto = await Crypto.findById(id);
    console.log(crypto);
    crypto.buyers.push(user);
    console.log(crypto.buyers);


    return crypto.save();

}

async function searchResults(searchName, searchPaymentMethod) {
    if (!searchName && !searchPaymentMethod) {
        return Crypto.find({}).lean();
    } else if (!searchName) {
        return Crypto.find({ paymentMethod: searchPaymentMethod }).collation({ locale: 'en', strength: 2 }).lean();
    } else {
        return Crypto.find({ name: searchName }).collation({ locale: 'en', strength: 2 }).lean();

    }
}

module.exports = {
    getAllCrypto,
    createCrypto,
    getById,
    getCryptoAuthor,
    deleteCrypto,
    editCrypto,
    buy,
    searchResults
}


