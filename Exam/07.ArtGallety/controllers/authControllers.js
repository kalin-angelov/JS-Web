const { usernameChecker, emailChecker, login, register } = require('../manager/authManager');
const errorHandler = require('../utils/errorHandler');

exports.getRegisterPage = (req, res) => {
    res.render('register');
};

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.postRegister = async (req, res) => {
    const { username, password, repeatPassword, address } = req.body;

    const existingUsername = await usernameChecker(username);

    if(existingUsername) {
        return res.render('register', { error: 'Username Already Exist!'});
    } 

    if (password !== repeatPassword) {
        return res.render('register', { error: 'Password\'s Don\'t Match!'});
    }

    try {
        await register(username, password, address);
    } catch(err) {
        const error = errorHandler(err);
        return res.render('register', { error: error.message });
    } 

    try {
        const token = await login(username, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch(err) {
        return res.render('login', { error: err });
    }
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const token = await login(username, password);
        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch(err) {
        return res.render('login', { error: err });
    }

};

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
};
