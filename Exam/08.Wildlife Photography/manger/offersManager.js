const Post = require('../models/Post');
const User = require('../models/User');

exports.findOffer = async (offerId) => {

    if (!offerId) {
        const offer = await Post.find().lean()
        return { offer };
    }
    
    const offer = await Post.findById(offerId).populate('author').lean();
    const authorId = offer.author[0]._id.toString();
    const offerAuthor = await User.findById(authorId);
    const name = offerAuthor.first + ' ' + offerAuthor.last;
    
    return { offer, name };
};

exports.findOwner = async (offerId, userId) => {
    const offer = await Post.findById(offerId).populate('author').lean();

    return offer.author.some(author => author._id.toString() === userId);
};

exports.findIfCanVote = async (offerId, userEmail) => {
    const offer = await Post.findById(offerId).lean();
    const canVote = offer.votes.some(email => email  === userEmail);

    if(!canVote) {
        return true;
    } else {
        return false;
    }
};

exports.voteUp = async (offerId, userId) => {
    const offer = await Post.findById(offerId);
    const user = await User.findById(userId).lean();
    const userEmail = user.email;

    let rating = offer.rating + 1;
    
    await offer.updateOne({ rating: rating });
    await offer.votes.push(userEmail);
    await offer.save();

};

exports.voteDown = async (offerId, userId) => {
    const offer = await Post.findById(offerId);
    const user = await User.findById(userId).lean();
    const userEmail = user.email;
    let rating = offer.rating - 1;
    
    await offer.updateOne({ rating: rating });
    await offer.votes.push(userEmail);
    await offer.save();
};

exports.whoHasVoted = async (offerId) => {
    const offer = await Post.findById(offerId).lean();
    
    return offer.votes;
};

exports.findProfileInfo = async (userId) => {
    const user = await User.findById(userId).populate('post').lean();

    return user.post;
};
