const Housing = require('../models/Housing');
const User = require('../models/User');

exports.findProduct = async (productId) => {

    if (!productId) {
        const products = await Housing.find().lean()
        return products;
    }
    
    const product = await Housing.findById(productId).lean();
    const pieces = product.pieces;
    return {product, pieces};
};

exports.topThree = async() => {
    const offers = await Housing.find().lean();
    
    const top = offers.slice(-3);

    return top;
};

exports.findOwner = async (productId, userId) => {
    const product = await Housing.findById(productId).populate('owner').lean();

    return product.owner.some(user => user._id.toString() === userId);
};

exports.rented = async(offerId, userId) => {
    const offer = await Housing.findById(offerId).populate('rented');

    const result = offer.rented.some(user => user._id.toString() === userId);

    if(!result) {
        return true;
    } else {
        return false
    }
};

exports.rentHouse = async (offerId, userId) => {
    const offer = await Housing.findById(offerId).populate('rented');

    await offer.rented.push(userId);
    await offer.save();

    const pieces = offer.pieces - 1;

    await offer.updateOne({ pieces: pieces });
};

exports.people = async(offerId) => {

    const offer = await Housing.findById(offerId).populate('rented').lean();
    return offer.rented.join(', ');
};

exports.findResult = async(search) => {
    const offers = await Housing.find().lean();
    const result = offers.filter(offer => offer.type.toLowerCase().includes(search.toLowerCase()));
    
    return result;
};
