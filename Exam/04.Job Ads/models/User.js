const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Email Is Required!'],
        validate: {
            validator: function(value) {
                return /[a-zA-Z]+@[a-zA-z]+\.[a-zA-Z]+/.test(value);
            },
            message: 'Invalid Email!'
        }
    },
    password: {
        type: String,
        required: [true, 'Password Is Required!'],
        minLength: [5, 'Password Must Be At Leas Five(5) Character\'s!']
    },
    skill: {
        type:String,
        required: [true, 'Skill Description Is Required!'],
        maxLength: [40, 'Skill Description Can\'t Be More Than (40) Character\'s Long!']
    },
    ads: [{
        type: mongoose.Types.ObjectId,
        ref: 'Ads'
    }]

});

const User = mongoose.model('User', userSchema);

module.exports = User;
