const { usernameValidation, register, login } = require('../manager/userManager');
const errorHandler = require('../utils/errorUtil');

exports.getLoginPage = (req, res) => {
    res.render('login');
};

exports.getRegisterPage = (req, res) => {
    res.render('register');
};

exports.postRegister = async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.render('register', { err: 'Password\'s don\'t match'});
    }

    const existingUsername = await usernameValidation(username);

    if (existingUsername) {
        return res.render('register', { err: 'Username already exist'});
    }

    try {
       await register(username, password);

    } catch(error) {
        const err = errorHandler(error);
        return res.render('register', { err: err.message });
    }
    

    try {
        const token = await login(username, password);

        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch(err) {
        res.render('login', { err: err.message });
    }
    
};

exports.postLogin = async (req, res) => {
    const { username, password} = req.body;
    
    try {
        const token = await login(username, password);
        res.cookie('auth', token, { httpOnly: true });
    } catch(err) {
        return res.render('login', { err: err});
    }
    
    res.redirect('/');
};
