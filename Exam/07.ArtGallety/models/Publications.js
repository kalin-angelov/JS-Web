const mongoose = require('mongoose');

const publicationsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Title Is Required!'],
        minLength: [6, 'Tittle Must Be At Least Six(6) Character\'s!'],
    },
    technique: {
        type: String,
        required: [true, 'Painting Technique Is Required!'],
        maxLength: [20, 'Painting Technique Cant Be More Than (20) Character\'s Long!']
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
    certificate: {
        type: String,
        required: [true, 'Certificate Of Authenticity Is Required!'],
        enum: ['yes', 'no']
    },
    author: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    shared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Publications = mongoose.model('Publications', publicationsSchema);

module.exports = Publications;
