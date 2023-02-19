const { findProduct, findOwner, doYouHaveProduct, addToWishList, list } = require('../manager/productManager');

exports.getHomePage = (req, res) => {
    const pageName = 'Home Page';
    res.render('home', { pageName });
};

exports.getCatalogPage = async (req, res) => {
    const pageName = 'Catalog Page';
    const products = await findProduct();
    res.render('catalog', { pageName, products });
};

exports.getProfilePage = async (req, res) => {
    const pageName = 'Profile Page';
    const userEmail = req.user.email;
    const wishList = await list(userEmail);
    
    res.render('profile', { pageName, userEmail, wishList });
};

exports.getDetailsPage = async (req, res) => {
    const pageName = 'Details Page';
    const productId = req.params.id;

    const product = await findProduct(productId);

    if (!req.user) {
        return res.render('details', { pageName, product });
    }

    const userId = req.user.id;

    const isOwner = await findOwner(productId, userId);
    const hasProduct = await doYouHaveProduct(productId, userId);

    res.render('details', { pageName, product, isOwner, hasProduct });
};

exports.get404Page = (req, res) => {
    const pageName = '404 Page'
    res.render('404', { pageName });
};

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
};

exports.getWish = async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;

    await addToWishList(productId, userId);

    res.redirect(`/details/${productId}`);
};
