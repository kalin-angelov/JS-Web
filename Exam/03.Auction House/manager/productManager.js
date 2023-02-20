const Auction = require('../models/Auction');
const User = require('../models/User');

exports.findProduct = async (productId) => {

    if (!productId) {
        const products = await Auction.find().lean()
        return products;
    }
    
    const product = await Auction.findById(productId).lean();
    return product;
};

exports.findOwner = async (productId, userId) => {
    const product = await Auction.findById(productId);

    return product.author.some(user => user._id.toString() === userId);
};

exports.makeBid = async (newPrice, userId, offerId) => {

    const offer = await Auction.findById(offerId);

    if(offer.price < newPrice) {
        await offer.updateOne({ price: newPrice });
        await offer.bidder.splice(0,1,userId);
        await offer.save();
    }

};

exports.findHighestBitter = async (offerId) => {
  const bidder = await Auction.findById(offerId).populate('bidder').lean();

  if (bidder.bidder.length !== 0) {
    return `${bidder.bidder[0].first} ${bidder.bidder[0].last}`
  }

};

exports.compare = async (userId, offerId) => {
    const offerTopBidder = await Auction.findById(offerId).populate('bidder').lean();

    if (offerTopBidder.bidder[0]._id.toString() === userId) {
        return true;
    }else {
        return false;
    }
};

exports.stop = async (offerId, userId) => {

    const offer = await Auction.findById(offerId);

    const user = await User.findById(userId);

    await user.auction.push(offer);
    await user.save();
    await Auction.findByIdAndDelete(offerId);

};

exports.findCloseOffers = async (userId) => {

    const offers = await User.findById(userId).populate('auction').lean();

    console.log(offers);
};