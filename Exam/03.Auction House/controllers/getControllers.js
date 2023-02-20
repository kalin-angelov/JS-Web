const { findProduct, findOwner, findHighestBitter, compare, stop, findCloseOffers } = require('../manager/productManager');

exports.getHomePage = (req, res) => {
    const pageName = 'Home Page';
    res.render('home', { pageName });
};

exports.getBrowsePage = async (req, res) => {
    const pageName = 'Browse Page';
    const offers = await findProduct();
    res.render('browse', { pageName, offers });
};

exports.getClosePage = async (req, res) => {
    const pageName = 'Close Auctions Page';
    const userId = req.user.id;
    const closeOffers = await findCloseOffers(userId);

    res.render('closed', { pageName });
};

exports.getOwnerPage = (req, res) => {
    const pageName = 'Owner Details Page';
    res.render('owner', { pageName });
};

exports.getDetailsPage = async (req, res) => {
    const pageName = 'Details Page';
    const productId = req.params.id;

    const offer = await findProduct(productId);

    if (!req.user) {
        return res.render('details', { pageName, offer });
    }

    const userId = req.user.id;

    const isOwner = await findOwner(productId, userId);

    const highestBidder = await findHighestBitter(productId);

    const youAreTheHighestBidder = await compare(userId, productId);

    res.render('details', { pageName, offer, isOwner, highestBidder, youAreTheHighestBidder });
};

exports.get404Page = (req, res) => {
    const pageName = '404 Page'
    res.render('404', { pageName });
};

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
};

exports.getStopAuction = async (req,res) => {
    const offerId = req.params.id;
    const userId = req.user.id;

   await stop(offerId, userId);

};