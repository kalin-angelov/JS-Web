const { createCrypto } = require('../manager/cryptoManager');
const { updateOffer } = require('../manager/offersManager');
const errorHandler = require('../utils/errorHandler');
 
exports.postCreate = async (req, res) => {
    const { name, image, price, description, payment } = req.body;
    const userId = req.user.id;

    try {
        await createCrypto(userId, name, image, price, description, payment);
        res.redirect('/catalog');
        
    } catch(err) {
        const error = errorHandler(err);
        return res.render('create', { error: error.message });
    }
};

exports.postEdit = async (req, res) => {
    const { name, image, price, description, payment } = req.body;

    if (name === '' || image=== '' || price=== '' || description=== '' || payment === '') {
        return res.render('edit', { error: 'All Field\'s Are Required!' });
    };
    
    const offerId = req.params.offerId;

    try {
        await updateOffer(offerId, name, image, price, description, payment);
        res.redirect(`/details/${offerId}`);
    } catch(err) {
        return res.render('edit', { error: err.message });
    }
};
