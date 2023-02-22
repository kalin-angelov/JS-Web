const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({

    start: {
        type: String,
        required: [true, 'Start Point Is Required!'],
        minLength: [4, 'Start Point Must Be At Least Four(4) Character\'s!'],
    },
    end: {
        type: String,
        required: [true, 'End Point Is Required!'],
        minLength: [4, 'End Point Must Be At Least Four(4) Character\'s!'],
    },
    date: {
        type: String,
        required: [true, 'Date Is Required!']
    },
    time: {
        type: String,
        required: [true, 'Time Is Required!']
    },
    image: {
        type: String,
        required: [true, 'Image Is Required!'],
        validate: {
            validator: function(value) {
                if (!value.startsWith('http') || !value.startsWith('https')) {
                    throw new Error('Invalid Image URL!');
                }
            }
        }
    },
    brand: {
        type: String,
        required: [true, 'Car Brand Is Required!'],
        minLength: [4, 'Brand Must Be At Least Four(4) Character\'s!']
    },
    seats: {
        type: Number,
        required: [true, 'Seats Is Required!'],
        min: [0, 'Min Seats Required (0)!'],
        max: [4, 'Max Seats Required (4)!'],
        validate: {
            validator: function(value) {
                if (value < 0) {
                    throw new Error('Seats Number Must Be Positive Number!');
                }
            }
        }
    },
    price: {
        type: Number,
        required: [true, 'Price Is Required!'],
        min: [0, 'Price Can\'t Be Less Than (0)!'],
        max: [50, 'Price Can\'t Be More Than (50)!'],
        validate: {
            validator: function(value) {
                if (value < 0) {
                    throw new Error('Price Must Be Positive Number!');
                }
            }
        }
    },
    description: {
        type: String,
        required: [true, 'Description Is Required!'],
        minLength: [10, 'Description Must Be At Least Ten(10) Character\'s!']
    },
    creator: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    buddies: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
