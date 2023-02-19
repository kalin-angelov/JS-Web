const Book = require('../models/Book');

exports.addNewProduct = (title, author, genre, stars, image, review, user) => Book.create( { title, author, genre, stars, image, review, user } );

exports.updateProduct = (productId, title, author, genre, stars, image, review) => Book.findByIdAndUpdate(productId, { title, author, genre, stars, image, review }, { runValidators: true });

exports.del = (productId) => Book.findByIdAndDelete(productId);
