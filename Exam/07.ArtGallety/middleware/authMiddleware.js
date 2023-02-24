const jwt = require('../lib/jsonwebtoken');
const SECRET = require('../config');

const Publications = require('../models/Publications');

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
};

exports.isAuthorized = async (req, res, next) => {
    const userId = req.user.id;
    const offerId = req.params.id;

    const product = await Publications.findById(offerId).populate('author').lean();
    if(!product.author.some(offer => offer._id.toString() === userId)) {
        return res.redirect('/404');
    }

    next();
};
