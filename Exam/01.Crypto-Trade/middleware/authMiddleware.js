const jwt = require('../lib/jsonwebtoken');
const SECRET = require('../config');

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];

    if(token) {
        try {
            const decodeToken = await jwt.verify(token, SECRET);

            req.user = decodeToken;
            req.isAuthenticated = true;

            res.locals.username = decodeToken.username;
            res.locals.isAuthenticated = true;
        } catch(err) {
            res.clearCookie('auth');
            return  res.redirect('/404');
        }
    }

    next();
};

exports.isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.redirect('/404');
    }

    next();
}
