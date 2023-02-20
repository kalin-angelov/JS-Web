const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Email Is Required!'],
        validate: {
            validator: function(value) {
                return /[a-zA-Z]+@[a-z]+\.[a-z]+/.test(value);
            },
            message: 'Invalid Email'
        }
    },
    first: {
        type:String,
        required: [true, 'First Name Is Required!'],
        minLength: [1, 'First Name Must Be At Least One(1) Character\'s!']
    },
    last: {
        type:String,
        required: [true, 'Last Name Is Required!'],
        minLength: [1, 'Last Name Must Be At Least One(1) Character\'s!']
    },
    password: {
        type: String,
        required: [true, 'Password Is Required!'],
        minLength: [5, 'Password Must Be At Leas Four(4) Character\'s!']
    },
    auction: [{
        type: mongoose.Types.ObjectId,
        ref: 'Auction'
    }]

});

// userSchema.pre('save', async function() {
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
