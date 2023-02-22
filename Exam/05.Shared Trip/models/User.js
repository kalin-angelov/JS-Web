const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        minLength: [4, 'Password Must Be At Leas Four(4) Characters!']
    },
    gender: {
        type:String,
        enum: ['male', 'female'],
        required: [true, 'Gender Is Required!'],
    },
    trip: [{
        type: mongoose.Types.ObjectId,
        ref: 'Trip'
    }]

});

// userSchema.pre('save', async function() {
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
