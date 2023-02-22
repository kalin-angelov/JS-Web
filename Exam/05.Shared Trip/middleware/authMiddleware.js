const jwt = require('../lib/jsonwebtoken');
const SECRET = require('../config');

const Trip = require('../models/Trip');

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
    const productId = req.params.id;

    const product = await Trip.findById(productId).populate('creator').lean();
    if(!product.creator.some(product => product._id.toString() === userId)) {
        return res.redirect('/404');
    }

    next();
};
