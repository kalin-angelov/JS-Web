const { makeBid } = require('../manager/productManager');

exports.postBid = async (req, res) => {
    const newPrice = req.body.bid
    const userId = req.user.id;
    const offerId = req.params.id;
   
    await makeBid(newPrice, userId, offerId);

    res.redirect(`/details/${offerId}`);
};