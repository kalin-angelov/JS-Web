const Ads = require('../models/Ads');
const User = require('../models/User');

exports.findProduct = async (productId) => {

    if (!productId) {
        const products = await Ads.find().lean()
        return products;
    }
    
    const product = await Ads.findById(productId).lean();
    return product;
};

exports.findOwner = async (productId, userId) => {
    const product = await Ads.findById(productId).populate('author').lean();

    return product.author.some(user => user._id.toString() === userId);
};

exports.findOfferAuthor = async (offerId) => {
    const offer = await Ads.findById(offerId);
    const offerAuthor = offer.author.toString();
    const author = await User.findById(offerAuthor);
    return author.email;
};

exports.applyForJob = async (offerId, userId) => {

    const offer = await Ads.findById(offerId);
    await offer.applied.push(userId);
    await offer.save();
};

exports.findIfApply = async (offerId, userId) => {

    const offer = await Ads.findById(offerId);
    const people= Number(offer.applied.length);
    const apply = offer.applied.some(user => user._id.toString() === userId);

    return { people, apply };
};

exports.findPeople = async (offerId) => {
    const offer = await Ads.findById(offerId).populate('applied').lean();

    return offer.applied;
};

exports.firstThree = async () => {
    let offers = await Ads.find().lean();
    
    return offers.slice(-3);
};