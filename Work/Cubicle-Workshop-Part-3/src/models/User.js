const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username cant be less than 5 characters!'],
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Invalid username, should consist only English letters and digits!'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [8, 'Password cant be less than 8 characters!'],
        validate: {
            validator: function(value) {
            return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Invalid password, should consist only English letters and digits!'
        }
    },
    cube: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cube'
    }]
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;
