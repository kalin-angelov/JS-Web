const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: true,
        mingLength: 3
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'Password is to short!!!']
    }
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

userSchema.method('validPassword', function(password) {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
