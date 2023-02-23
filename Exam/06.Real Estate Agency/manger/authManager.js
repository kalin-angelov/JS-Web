const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('../lib/jsonwebtoken');
const SECRET = require('../config');

exports.usernameChecker = (username) => User.findOne( {username} );

exports.register = async (name, username, password) => {
    
    try {
        const user = await User.create({ name, username, password });

        const hash = await bcrypt.hash(password, 10);
        password = hash;
    
        await user.updateOne( { password: hash });
    
        return user;
    } catch(err) {
        throw err;
    }
    
};

exports.login = async (username, password) => {

    if (username === '' || password === '') {
        throw 'All Field\'s Are Required!';
    }

    const validUsername = await this.usernameChecker(username).lean();

    if (!validUsername) {
        throw 'Invalid Username Or Password!';
    }

    const validPassword = await bcrypt.compare(password, validUsername.password);

    if (!validPassword) {
        throw 'Invalid Username Or Password!';
    }

    const payload = { username: validUsername.username, id: validUsername._id.toString() };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });

    return token;
}
