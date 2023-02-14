exports.getHomePage = (req, res) => {
    res.render('index');
};

exports.getRegisterPage = (req, res) => {
    res.render('registerPage');
};

exports.getLoginPage = (req, res) => {
    res.render('loginPage');
};

exports.get404Page = (req, res) => {
    res.render('404');
}

exports.logout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/login');
}
