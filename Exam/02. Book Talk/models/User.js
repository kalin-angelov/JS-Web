const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Email Is Required!'],
        minLength: [10, 'Email Must Be At Least Ten(10) Characters!']
    },
    username: {
        type:String,
        required: [true, 'Username Is Required!'],
        minLength: [4, 'Username Must Be At Least Five(5) Characters!']
    },
    password: {
        type: String,
        required: [true, 'Password Is Required!'],
        minLength: [3, 'Password Must Be At Leas Four(4) Characters!']
    },
    book: [{
        type: mongoose.Types.ObjectId,
        ref: 'Book'
    }]

});

// userSchema.pre('save', async function() {
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
