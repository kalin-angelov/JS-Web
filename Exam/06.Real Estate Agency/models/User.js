const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    name: {
        type:String,
        required: [true, 'Name Is Required!'],
        validate: {
            validator: function(value) {
                return /^[A-Za-z]+\ [A-Za-z]+$/.test(value);
            },
            message: 'Name Must Be In Format First Name Last Name (Kalin Angelov)!'
        }
    },
    username: {
        type:String,
        required: [true, 'Username Is Required!'],
        minLength: [5, 'Username Must Be At Least Five(5) Characters!']
    },
    password: {
        type: String,
        required: [true, 'Password Is Required!'],
        minLength: [4, 'Password Must Be At Leas Four(4) Characters!']
    },
    housing: [{
        type: mongoose.Types.ObjectId,
        ref: 'Housing'
    }]

});

// userSchema.pre('save', async function() {
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash;
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
