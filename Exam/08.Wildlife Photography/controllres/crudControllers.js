const errorHandler = require('../utils/errorHandler');
const { addNewOffer, updateOffer, del } = require('../manager/crudOffersManager');
const { findOffer, findOwner, findIfCanVote, whoHasVoted } = require('../manager/offersManager');

exports.getCreatePage = (req, res) => {
    const pageName = 'Create Page';
    const email = req.user.email;
   
    res.render('create', { pageName, email });
};

exports.postCreate = async (req, res) => {
    const { title, keyword, location, date, image, description } = req.body;
    const userId = req.user.id;

    try {
        await addNewOffer(title, keyword, location, date, image, description, userId);
        res.redirect('/catalog');
    } catch(err) {
        const error = errorHandler(err);
        return res.render('create', { error: error.message });
    }
};

exports.getEditPage = async (req, res) => {
    const pageName = 'Edit Page';
    const offerId = req.params.id;
    const offer = await findOffer(offerId);
    const email = req.user.email;

    res.render('edit', { pageName, email, offer });
};

exports.postEdit = async (req, res) => {
    const { title, keyword, location, date, image, description } = req.body;

    const offerId = req.params.id;

    try {
        await updateOffer(offerId, title, keyword, location, date, image, description);
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

    const { offer, name } = await findOffer(offerId);

    if (!req.user) {
        return res.render('details', { pageName, offer, name });
    }
    const email = req.user.email;

    const userId = req.user.id;

    const isOwner = await findOwner(offerId, userId);
    const canVote = await findIfCanVote(offerId, email)
    const people = await whoHasVoted(offerId, userId);
    const votes = people.join(', ');

    res.render('details', { pageName, email, offer, name, isOwner, canVote, votes });
};
