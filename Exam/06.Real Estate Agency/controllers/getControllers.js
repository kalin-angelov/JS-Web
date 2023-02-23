const { findProduct, findOwner, topThree, rented, rentHouse, people } = require('../manager/productManager');

exports.getHomePage = async (req, res) => {
    const pageName = 'Home Page';
    const top = await topThree();

    res.render('home', { pageName, top });
};

exports.getCatalogPage = async (req, res) => {
    const pageName = 'Catalog Page';
    const offers = await findProduct();

    res.render('catalog', { pageName, offers });
};

exports.getDetailsPage = async (req, res) => {
    const pageName = 'Details Page';
    const productId = req.params.id;

    const {product, pieces } = await findProduct(productId);

    if (!req.user) {
        return res.render('details', { pageName, product });
    }

    const userId = req.user.id;

    const isOwner = await findOwner(productId, userId);
    const rent = await rented(productId, userId);
    const peopleHousing = await people(productId);

    res.render('details', { pageName, product, pieces, isOwner, rent, peopleHousing });
};

exports.getRentPage = async (req, res) => {
    const offerId = req.params.id;
    const userId = req.user.id;

    await rentHouse(offerId, userId);
    res.redirect(`/details/${offerId}`);
};

exports.getSearchPage = (req,res) => {
    const pageName = 'Search Page';
    res.render('search', { pageName });
};

exports.get404Page = (req, res) => {
    const pageName = 'Page Not Found'
    res.render('404', { pageName });
};

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
};
