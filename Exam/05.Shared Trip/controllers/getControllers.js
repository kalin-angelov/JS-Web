const { findProduct, findOwner, join, hasJoin, buddies, trips } = require('../manager/productManager');

exports.getHomePage = (req, res) => {
    const pageName = 'Home Page';
    if (req.user) {
        const email = req.user.email;
        return res.render('home' , { pageName, email });
    }
    res.render('home', { pageName });
};

exports.getSharedPage = async (req, res) => {
    const pageName = 'Shared Trip Page';
    const offers = await findProduct();
    if (req.user) {
        const email = req.user.email;
        return res.render('shared', { pageName, email, offers })
    }
    res.render('shared', { pageName, offers });
};

exports.getDetailsPage = async (req, res) => {
    const pageName = 'Details Page';
    const productId = req.params.id;

    const { product, driver, seats } = await findProduct(productId);

    if (!req.user) {
        return res.render('details', { pageName, product, driver });
    }

    const userId = req.user.id;
    const email = req.user.email;
    const isOwner = await findOwner(productId, userId);
    const joined = await hasJoin(productId, userId);
    const joinedPeople = await buddies(productId);

    res.render('details', { pageName, email,  product, driver, joinedPeople, seats, isOwner, joined });
};

exports.getProfilePage = async(req, res) => {
    const pageName = 'Profile Page';
    const email = req.user.email;
    const userId = req.user.id;

    const { tripsNumber, allTrips } = await trips(userId);

    res.render('profile', { pageName, email, tripsNumber ,allTrips });
};

exports.joinTrip = async(req, res) => {
    const userId = req.user.id;
    const offer = req.params.id;

    await join(offer, userId);

    res.redirect(`/details/${offer}`);
};

exports.get404Page = (req, res) => {
    const pageName = 'Page Not Found';
    
    if (req.user) {
        const email = req.user.email;
        return res.render('404', { pageName, email })
    }
    res.render('404', { pageName });
};

exports.getLogout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
};