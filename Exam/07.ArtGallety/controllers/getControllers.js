const { findOffer, sharedPainting } = require('../manager/offersManager');
const { userInfo } = require('../manager/userManager');

exports.getHomePage = async (req, res) => {
    const pageName = 'Home Page';
    const offers = await findOffer();

    res.render('home', { pageName , offers});
};

exports.getCatalogPage = async (req, res) => {
    const pageName = 'Catalog Page';
    const offers = await findOffer();

    res.render('catalog', { pageName, offers });
};

exports.getShared = async (req, res) => {
    const offerId = req.params.id;
    const userId = req.user.id;

    await sharedPainting(offerId, userId);

    res.redirect(`/details/${offerId}`);
};

exports.getProfilePage = async (req, res) => {
    const pageName = 'Profile Page';
    const userId = req.user.id;

    const { username, address, userOffers } = await userInfo(userId);

    res.render('profile', { pageName, username, address, userOffers });
};

exports.get404Page = (req, res) => {
    const pageName = 'Page Not Found'
    
    res.render('404', { pageName });
};
