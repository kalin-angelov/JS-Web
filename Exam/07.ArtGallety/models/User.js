const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type:String,
        required: [true, 'Username Is Required!'],
        minLength: [4, 'Username Must Be At Least Four(4) Characters!']
    },
    password: {
        type: String,
        required: [true, 'Password Is Required!'],
        minLength: [4, 'Password Must Be At Leas Four(4) Characters!']
    },
    address: {
        type: String,
        required: [true, 'Address Is Required!'],
        maxLength: [20, 'Address Can\'t Be More Than (20) Characters!']
    },
    publications: [{
        type: mongoose.Types.ObjectId,
        ref: 'Publications'
    }]

});

const User = mongoose.model('User', userSchema);

module.exports = User;
