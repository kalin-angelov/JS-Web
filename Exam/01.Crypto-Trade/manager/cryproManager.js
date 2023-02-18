const Crypto = require('../models/Crypto');
const User = require('../models/User');

exports.createCrypto = async (userId, name, image, price, description, payment) => {

    try {
        const newCrypto =  await Crypto({name, image, price, description, payment});
        await newCrypto.users.push(userId)
        await newCrypto.save();
        
        return newCrypto;
    } catch(err) {
        throw err;
    }
};

exports.owner = async (userId, offerId) => {

    const offer = await Crypto.findById(offerId).populate('users').lean();
    const isOwner = offer.users.some(user => user._id.toString() === userId);
    
    return isOwner;
};

exports.canBuyCrypto = async (userId, offerId) => {
    const user = await User.findById(userId).populate('crypto');
    const hasOffer = user.crypto.some(offer => offer._id.toString() === offerId);

    if (!hasOffer) {
        return true;
    } else {
        return false;
    }
};
