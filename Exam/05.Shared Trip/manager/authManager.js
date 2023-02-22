const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('../lib/jsonwebtoken');
const SECRET = require('../config');

exports.emailChecker = (email) => User.findOne({ email });

exports.register = async (email, password, gender) => {
    
    try {
        const user = await User.create({ email, password, gender });

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
        throw 'All Field\'s Are Required!';
    }

    const validEmail = await this.emailChecker(email).lean();

    if (!validEmail) {
        throw 'Invalid Email Or Password!';
    }

    const validPassword = await bcrypt.compare(password, validEmail.password);

    if (!validPassword) {
        throw 'Invalid Email Or Password!';
    }

    const payload = { email: validEmail.email, id: validEmail._id.toString() };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1d' });

    return token;
}
