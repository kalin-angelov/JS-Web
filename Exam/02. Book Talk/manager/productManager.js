const Book = require('../models/Book');
const User = require('../models/User');

exports.findProduct = async (productId) => {

    if (!productId) {
        const products = await Book.find().lean()
        return products;
    }
    
    const product = await Book.findById(productId).lean();
    return product;
};

exports.findOwner = async (productId, userId) => {
    const product = await Book.findById(productId).populate('user').lean();

    return product.user.some(user => user._id.toString() === userId);
};

exports.doYouHaveProduct = async (productId, userId) => {
    const user = await User.findById(userId);

    const hasProduct = user.book.some(product => product._id.toString() === productId);

    if (!hasProduct) {
        return false
    } else {
        return true
    }
    
};

exports.addToWishList = async (productId, userId) => {
    let user = await User.findById(userId);
    await user.book.push(productId);
    await user.save();

};

exports.list = async (email) => {
   const list = await User.findOne( { email }).populate('book').lean();

   return list.book;
}
