const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({

    title:{
        type: String,
        required: [true, 'Title Is Required!'],
        minLength: [4, 'Title Must Be At Least Four(4) Character\'s!']
    },
    description: {
        type: String,
        maxLength: [200, 'Description Can\'t Be More Than 200 Character\'s!']
    },
    category: {
        type: String,
        enum: ['vehicles','estate', 'electronics', 'furniture', 'other'],
        required: [true, 'Category Is Required!'],
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Price Is Required!'],
        validate: {
            validator: function(value) {
                if (value < 0) {
                    throw new Error('Price Can\'t Be Negative Number!');
                }
            }
        }
    },
    author: [{
        required: [true, 'Author Is Required!'],
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    bidder: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]

});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
