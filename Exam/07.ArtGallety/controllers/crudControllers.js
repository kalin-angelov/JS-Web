const errorHandler = require('../utils/errorHandler');
const { addNewOffer, updateOffer, del } = require('../manager/crudOffersManager');
const { findOffer, findOwner, hasShared } = require('../manager/offersManager');

exports.getCreatePage = (req, res) => {
    const pageName = 'Create Page';
    
    res.render('create', { pageName });
};

exports.postCreate = async (req, res) => {
    const { title, technique, image, certificate } = req.body;
    const userId = req.user.id;

    try {
        await addNewOffer(title, technique, image, certificate, userId);
        res.redirect('/catalog');
    } catch(err) {
        const error = errorHandler(err);
        return res.render('create', { error: error.message });
    }
};

exports.getEditPage = async (req, res) => {
    const pageName = 'Edit Page';
    const offerId = req.params.id;
    const { offer } = await findOffer(offerId);

    res.render('edit', { pageName, offer });
};

exports.postEdit = async (req, res) => {
    const { title, technique, image, certificate } = req.body;

    const offerId = req.params.id;

    try {
        await updateOffer(offerId, title, technique, image, certificate);
        res.redirect(`/details/${offerId}`);
    } catch(err) {
        const error = errorHandler(err);
        return res.render('edit', { error: error.message });
    }
    
};

exports.deleteOffer = async (req, res) => {
    const offerId = req.params.id;
    await del(offerId);

    res.redirect('/catalog');
};

exports.getDetailsPage = async (req, res) => {
    const pageName = 'Details Page';
    const offerId = req.params.id;

    const { offer, author } = await findOffer(offerId);

    if (!req.user) {
        return res.render('details', { pageName, offer, author });
    }

    const userId = req.user.id;

    const isOwner = await findOwner(offerId, userId);

    const canShare = await hasShared(offerId, userId);

    res.render('details', { pageName, offer, author, isOwner, canShare });
};
