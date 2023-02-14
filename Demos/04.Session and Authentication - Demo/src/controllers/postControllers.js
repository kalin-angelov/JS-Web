const authManager = require('../manager/authManager');

exports.registerController = async (req, res) => {
    const { username, password, repeatPassword} = req.body;

    const usernameExist = await authManager.usernameCheck(username);

    if( password !== repeatPassword ) {
        return res.redirect('/404');
    }

    if( usernameExist ) {
        return res.redirect('/404');
    }

    const user = await authManager.register(username, password);

    res.redirect('/login');
};

exports.loginController = async (req, res) => {
    const { username, password} = req.body;

    try {
        const token = await authManager.login(username, password);

        res.cookie('auth', token, { httpOnly: true });
    } catch(err) {
        return res.redirect('/404');
    }
    
    res.redirect('/');
};
