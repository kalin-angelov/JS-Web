const config = require('../config');
const jwt = require('../lib/jsonwebtoken');

exports.authorization = async (req, res, next) => {

    const token = req.cookies['auth'];

    if(token) {
        try {
            const decodedToken = await jwt.verify(token, config.SECRET);

            req.user = decodedToken;
        } catch (err) {
            res.clearCookie('auth');
            res.redirect('/login');
        }
    }

    next();
};

exports.isAuthenticated = (req, res, next) => {

    if(!req.isAuthenticated) {
        res.redirect('/404');
    }

    next();
};
