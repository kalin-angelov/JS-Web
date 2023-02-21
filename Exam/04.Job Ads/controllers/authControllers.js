const { usernameChecker, emailChecker, login, register } = require('../manager/authManager');
const errorHandler = require('../utils/errorHandler');

exports.getRegisterPage = (req, res) => {
    res.render('register');
};

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.postRegister = async (req, res) => {
    const { email, password, repeatPassword, skill } = req.body;

    const existingEmail = await emailChecker(email);

    if (existingEmail) {
        return res.render('register', { error: 'Email already exist!'});
    }

    if (password !== repeatPassword) {
        return res.render('register', { error: 'Password\'s don\'t match!'});
    }

    try {
        await register(email, password, skill);
    } catch(err) {
        const error = errorHandler(err);
        return res.render('register', { error: error.message });
    } 

    try {
        const token = await login(email, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch(err) {
        return res.render('login', { error: err });
    }
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const token = await login(email, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch(err) {
        return res.render('login', { error: err });
    }

};
