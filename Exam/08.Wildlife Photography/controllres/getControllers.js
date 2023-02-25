const { findOffer, voteUp, voteDown, findProfileInfo } = require('../manager/offersManager');

exports.getHomePage = (req, res) => {
    const pageName = 'Home Page';
    if (req.user) {
        const email = req.user.email;
        return res.render('home', { pageName, email });
    }
    res.render('home', { pageName });
};

exports.getCatalogPage = async (req, res) => {
    const pageName = 'Catalog Page';
    const { offer } = await findOffer();
    if (req.user) {
        const email = req.user.email;
        return res.render('catalog', { pageName, email, offer });
    }
    res.render('catalog', { pageName, offer });
};

exports.getVoteUp = async (req, res) => {
    const userId = req.user.id;
    const offerId = req.params.id;
    
    await voteUp(offerId, userId);
    res.redirect(`/details/${offerId}`);

};

exports.getVoteDown = async (req, res) => {
    const userId = req.user.id;
    const offerId = req.params.id;
    
    await voteDown(offerId, userId);
    res.redirect(`/details/${offerId}`);
};

exports.getProfilePage = async (req, res) => {
    const pageName = 'Profile Page';
    const email = req.user.email;
    const userId = req.user.id;

    const posts = await findProfileInfo(userId);

    res.render('profile', { pageName, email, posts });
};

exports.get404Page = (req, res) => {
    const pageName = 'Page Not Found'
    if (req.user) {
        const email = req.user.email;
        return res.render('404', { pageName, email });
    }
    res.render('404', { pageName });
};
