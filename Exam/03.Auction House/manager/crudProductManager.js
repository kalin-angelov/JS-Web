const Auction = require('../models/Auction');

exports.addNewProduct = (title, category, image, price, description, author) => Auction.create( { title, category, image, price, description, author } );

exports.updateProduct = (productId, title, category, image, price, description) => Auction.findByIdAndUpdate(productId, { title, category, image, price, description }, { runValidators: true });

exports.del = (productId) => Auction.findByIdAndDelete(productId);