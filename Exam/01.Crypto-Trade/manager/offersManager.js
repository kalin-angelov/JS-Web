const Crypto = require('../models/Crypto');
const User = require('../models/User');

exports.findOffers = async (offerId) => {

    if (!offerId) {
        const offers = await Crypto.find().lean();
    
        return offers;
    }
   
    const offer = await Crypto.findById(offerId).lean();

    return offer;
};

exports.updateOffer = (offerId, name, image, price, description, payment) => Crypto.findByIdAndUpdate(offerId, { name, image, price, description, payment });

exports.deleteOffer = (offerId) => Crypto.findByIdAndDelete(offerId);

exports.searchFor = async (name, payment) => {
    if (name !== '') {
        const resultName = await Crypto.find({ name }).lean();
        return resultName;
    }

    const resultPayment = await Crypto.find({ payment }).lean();
    return resultPayment;
};

exports.buyOffer = async (offerId, userId) => {
    const user = await User.findById(userId);
    await user.crypto.push(offerId);
    await user.save();
};
