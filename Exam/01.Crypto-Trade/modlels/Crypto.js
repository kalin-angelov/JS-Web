const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name must be at least two(2) character\'s!']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: function(value) {
                if (!value.startsWith('http') || !value.startsWith('https')) {
                    throw new Error('Invalid image Url!');
                }
            }
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        validate: {
            validator: function(value) {
                if (value < 0) {
                    throw new Error('Price must be positive number!');
                }
            }
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description must be at least ten(10) characters!']
    },
    payment: {
        type: String,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'], 
        required: 'Payment method is required!'
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
