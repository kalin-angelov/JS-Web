const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'Cube name cant be less than 5 characters!'],
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9\ ]+$/.test(value);
            },
            message: 'Invalid name, should consist only English letters and digits! '
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [20, 'Descriptions should be at least 20 characters!'],
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9\ ]+$/.test(value);
            },
            message: 'Invalid text, should consist only English letters and digits! '
        }
    },
    imageUrl: {
        type: String,
        required: [true, 'ImageUrl is required!'],
        validate:{
            validator: function(value) {
                if (!value.startsWith('http') || !value.startsWith('https')) {
                    throw new Error ('Invalid URL');
                }
            }
        }
    },
    cube: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cube'
    }]
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;