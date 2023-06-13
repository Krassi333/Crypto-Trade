const { Schema, model, Types } = require('mongoose');
const User = require('./User');

const cryptoSchema = new Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    buyers: { type: [Types.ObjectId], ref: "User", default: [] },
    owner: { type: [Types.ObjectId], ref: "User" }

});

cryptoSchema.index({ author: 1 }, {
    locale: 'en',
    strength: 2
})

const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto;


