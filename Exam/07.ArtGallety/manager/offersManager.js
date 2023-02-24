const Publications = require('../models/Publications');
const User = require('../models/User');

exports.findOffer = async (offerId) => {

    if (!offerId) {
        const offers = await Publications.find().lean()
        return offers;
    }
    
    const offer = await Publications.findById(offerId).populate('author', 'shared').lean();
    
    const authorId = offer.author[0]._id.toString();
    const user = await User.findById(authorId);
    const author = user.username;

    const sharedNumber = offer.shared.length;
    
    return {offer, author, sharedNumber};
};

exports.findOwner = async (offerId, userId) => {
    const offer = await Publications.findById(offerId).populate('author').lean();

    return offer.author.some(author => author._id.toString() === userId);
};

exports.hasShared = async (offerId, userId) => {
    const offer = await Publications.findById(offerId).populate('shared');
    const result = offer.shared.some(offer => offer._id.toString() === userId);

    if (!result) {
        return true;
    } else {
        return false;
    }
};

exports.sharedPainting = async (offerId, userId) => {
    const offer = await Publications.findById(offerId).populate('shared');
    
    await offer.shared.push(userId);
    await offer.save();
};
