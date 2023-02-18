const { findOffers, searchFor } = require('../manager/offersManager');
const { owner, canBuyCrypto } = require('../manager/cryptoManager');
const { deleteOffer, buyOffer } = require('../manager/offersManager');

exports.getHomePage =  (req, res) => {
    const pageName = 'Home Page - Crypto Web';

    res.render('home', { pageName });
};

exports.getCatalogPage = async (req, res) => {
    const pageName = 'Catalog Page - Crypto Web';

    let offer = await findOffers();

    res.render('catalog', { pageName, offer });
};

exports.getDetailsPage = async (req, res) => {
    const pageName = 'Details Page';
    const offerId = req.params.offerId;
    if (!req.isAuthenticated) {
        const offer = await findOffers(offerId);

        return res.render('details', { pageName, offer }); 
    }

    const userId = req.user.id;
    const isOwner = await owner(userId, offerId);
    const canBuy = await canBuyCrypto(userId, offerId);
    const offer = await findOffers(offerId);

    res.render('details', { pageName, offer, isOwner, canBuy }); 
};

exports.getEditPage = async (req, res) => {
    const pageName = 'Edit Page';
    const offerId = req.params.offerId;

    const offer = await findOffers(offerId);

    res.render('edit', { pageName, offer });
};

exports.getCreatePage = (req, res) => {
    const pageName = 'Create Page - Crypto Web';
    res.render('create', { pageName });
};

exports.getDeletePage = async (req, res) => {
    const offerId = req.params.offerId;

    try {
        await deleteOffer(offerId);
        res.redirect('/catalog');
    } catch(err) {
        return res.redirect('/404');
    }
};

exports.getSearchPage = async (req, res) => {
    const pageName = 'Search';
    const { name, payment } = req.query;
    
    const result = await searchFor(name, payment);
    
    res.render('search', { pageName, result });
}

exports.get404Page = (req, res) => {
    const pageName = '404 Page - Crypto Web';
    res.render('404', { pageName });
};

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
};

exports.getBuy = async (req, res) => {
    const userId = req.user.id;
    const offerId = req.params.id;

    await buyOffer(offerId, userId);
    res.redirect(`/details/${offerId}`);
};
