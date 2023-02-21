const { findProduct, findOwner, findOfferAuthor, applyForJob, findIfApply, findPeople, firstThree } = require('../manager/productManager');

exports.getHomePage = async (req, res) => {
    const pageName = 'Home Page';
    const offers = await firstThree();
    
    res.render('home', { pageName, offers });
};

exports.getCatalogPage = async (req, res) => {
    const pageName = 'Catalog Page';
    const offers = await findProduct();
    res.render('catalog', { pageName,  offers });
};

exports.getDetailsPage = async (req, res) => {
    const pageName = 'Details Page';
    const productId = req.params.id;

    const offer = await findProduct(productId);
    const email = await findOfferAuthor(productId);

    if (!req.user) {
        return res.render('details', { pageName, offer, email });
    }

    const userId = req.user.id;

    const isOwner = await findOwner(productId, userId);

    const { people, apply } = await findIfApply(productId, userId);

    const appliedPeople = await findPeople(productId);
    
    res.render('details', { pageName, offer, email, isOwner, apply, people, appliedPeople });
};

exports.getApply = async (req, res) => {

    const offerId = req.params.id;
    const userId = req.user.id;

    await applyForJob(offerId, userId);

    res.redirect(`/details/${offerId}`);
};

exports.getSearchPage = (req, res) => {
    const pageName = 'Search Page'
    res.render('search', { pageName });
};

exports.get404Page = (req, res) => {
    const pageName = '404 Page'
    res.render('404', { pageName });
};

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
};