const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type:String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username must be at least five(5) characters!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email must be at least ten(10) characters!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password must be at leas four(4) characters!']
    },
    crypto: [{
        type: mongoose.Types.ObjectId,
        ref: 'Crypto'
    }]

});

// userSchema.pre('save', async function() {
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
