const { usernameChecker, emailChecker, login, register } = require('../manager/authManager');
const errorHandler = require('../utils/errorHandler');

exports.getRegisterPage = (req, res) => {
    const pageName = 'Register Page - Crypto Web';
    res.render('register', { pageName });
};

exports.getLoginPage = (req, res) => {
    const pageName = 'Login Page - Crypto Web';
    res.render('login', { pageName });
};

exports.postRegister = async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    const existingUsername = await usernameChecker(username);

    if(existingUsername) {
        return res.render('register', { error: 'Username already exist!'});
    } 

    const existingEmail = await emailChecker(email);

    if (existingEmail) {
        return res.render('register', { error: 'Email already exist!'});
    }

    if (password !== repeatPassword) {
        return res.render('register', { error: 'Password\'s don\t match!'});
    }

    try {
        await register(username, email, password);
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
