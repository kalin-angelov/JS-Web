const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    
    first: {
        type:String,
        required: [true, 'First Name Is Required!'],
        minLength: [3, 'First Name Must Be At Least Three(3) Characters!']
    },
    last: {
        type:String,
        required: [true, 'Last Name Is Required!'],
        minLength: [5, 'Last Name Must Be At Least Five(5) Characters!']
    },
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
        minLength: [4, 'Password Must Be At Leas Four(4) Characters!']
    },
    post: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }]

});

const User = mongoose.model('User', userSchema);

module.exports = User;
