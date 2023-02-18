const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('../lib/jsonwebtoken');
const SECRET = require('../config');

exports.usernameChecker = (username) => User.findOne( {username} );

exports.emailChecker = (email) => User.findOne({ email });

exports.register = async (username, email, password) => {
    
    try {
        const user = await User.create({ username, email, password });

        const hash = await bcrypt.hash(password, 10);
        password = hash;
    
        await user.updateOne( { password: hash });
    
        return user;
    } catch(err) {
        throw err;
    }
};

exports.login = async (email, password) => {

    if (email === '' || password === '') {
        throw 'All field\'s are required!';
    }

    const validEmail = await this.emailChecker(email).lean();

    if (!validEmail) {
        throw 'Invalid email or password!';
    }

    const validPassword = await bcrypt.compare(password, validEmail.password);

    if (!validPassword) {
        throw 'Invalid email or password!';
    }

    const payload = { username: validEmail.username, id: validEmail._id.toString() };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });

    return token;
};
