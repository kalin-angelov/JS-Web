const User = require('../model/User');
const config = require('../config');
const jwt = require('../lib/jsonwebtoken');

exports.usernameCheck = (username) => User.findOne({username});

exports.register = (username, password) => User.create({username, password});

exports.login = async (username, password) => {

    const user = await this.usernameCheck(username);
    const isValid = await user.validPassword(password);

    if(!user || !isValid) {
        throw 'Invalid username or password!!!'
    }

    const payload = { _id: user._id, username: user.username};
    const token = await jwt.sign(payload, config.SECRET, { expiresIn: '1d' });

    return token;
};
