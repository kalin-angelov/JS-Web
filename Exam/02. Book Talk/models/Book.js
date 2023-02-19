const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title Is Required!'],
        minLength: [2, 'Title Must Be At Least Two(2) Characters!']
    },
    author: {
        type: String,
        required: [true, 'Author Is Required!'],
        minLength: [5, 'Author Must Be At Least Five(5) Characters!']
    },
    genre: {
        type: String,
        required: [true, 'Genre Is Required!'],
        minLength: [3, 'Genre Must Be At Least Three(3) Characters!']
    },
    stars: {
        type: Number,
        required: [true, 'Stars Are Required!'],
        min: [1, 'Stars Must Be Between One(1) And Five(5)'],
        max: [5, 'Stars Must Be Between One(1) And Five(5)']
    },
    image: {
        type: String,
        required: [true, 'Image URL Is Required!'],
        validate: {
            validator: function(value) {
                if (!value.startsWith('http') || !value.startsWith('https')) {
                    throw new Error('Invalid Image URL!');
                }
            }
        }
    },
    review: {
        type: String,
        required: [true, 'Review Is Required!'],
        minLength: [10, 'Review Must Be At Least Ten(10) Characters!']
    },
    user: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
