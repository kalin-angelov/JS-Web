const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title Is Required!'],
        minLength: [6, 'Must Be At Least Six(6) Character\'s!']
    },
    keyword: {
        type: String,
        required: [true, 'Keyword Is Required!'],
        minLength: [6, 'Keyword Must Be At Least Six(6) Character\'s!']
    },
    location: {
        type: String,
        required: [true, 'Location Is Required!'],
        maxLength: [15, 'Location Cant Be More Than (15) Character\'s Long!']
    },
    date: {
        type: String,
        required: [true, 'Date Is Required!'],
        minLength: [10, 'Date Must Be Exactly Ten(10) Character\'s!'],
        maxLength: [10, 'Date Must Be Exactly Ten(10) Character\'s!']
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
        required: [true, 'Description Is Required!'],
        minLength: [8, 'Description Must Be At Least Eight(8) Character\'s!']
    },
    author: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    votes: [],
    rating: {
        type: Number,
        default: 0
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
