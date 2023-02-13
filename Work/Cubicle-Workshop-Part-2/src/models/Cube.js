const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
        maxLength: 100
    },
    imageUrl: {
        type: String,
        require: true,
        validate: {
            validator: function (value) {
                return value.startsWith('http://') || value.startsWith('https://')
            },
            message: 'Url invalid'
        }
    },
    difficultyLevel: {
        type: Number,
        require: true,
        min: 1,
        max: 6
    },
    accessories: [{ 
        type: mongoose.Types.ObjectId,
        ref: 'Accessory' 
    }]
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;
