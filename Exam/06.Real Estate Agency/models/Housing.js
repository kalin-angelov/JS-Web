const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name Is Required!'],
        minLength: [6, 'Name Must Be At Least Six(6) Character\'s!'],
    },
    type: {
        type: String,
        enum: ['apartment', 'villa', 'house'],
        required: [true, 'Property Type Is Required!']
        
    },
    year: {
        type: Number,
        required: [true, 'Year Build Is Required!'],
        min: [1850, 'Year Can\'t Be Before 1850!'],
        max: [2021, 'Year Can\'t Be After 2021!'],
    },
    city: {
        type: String,
        required: [true, 'City Is Required!'],
        minLength: [4, 'City Must Be At Least Four(4) Character\'s!'],
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
    description: {
        type: String,
        required: [true, 'Property Description Is Required!'],
        maxLength: [60, 'Property Description Cant Be More Than (60) Character\'s Long!']
    },
    pieces: {
        type: Number,
        required: [true, 'Available Piece\s Are Required!'],
        min: [1, 'Available Piece\s Can\'t Be Less Than one(1)!'],
        max: [10, 'Available Piece\s Can\t Be More Than Ten(10)!'],
        validate: {
            validator: function(value) {
                if (value < 0) {
                    throw new Error('Available PriceIs Must Be Positive Number!');
                }
            }
        }
    },
    owner: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    rented: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
   
});

const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;
