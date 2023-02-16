const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const config = require('../config');
const jwt = require('../lib/jsonwebtoken');

exports.usernameValidation = (username) => User.findOne({ username });

exports.register = (username, password) => User.create({ username, password });

exports.login = async (username, password) => {
    if (username === '' || password === '') {
        throw 'All field\'s must be filled!'
    };

    const user = await this.usernameValidation(username).lean();

    const validPassword = await bcrypt.compare(password, user.password);

    if (!user || !validPassword) {
        throw 'Invalid password or username!'
    };

    const payload = { username: user.username, id: user._id.toString() };
    const token = jwt.sign(payload, config.SECRET, { expiresIn: '1d' });
    
    return token;
};
