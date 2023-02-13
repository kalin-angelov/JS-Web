const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate:{
            validator: function (value) {
                return value.startsWith('http://') || value.startsWith('https://');
            },
            message: `Url invalid!`
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: 100
    }
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;
