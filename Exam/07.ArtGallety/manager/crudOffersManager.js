const Publications = require('../models/Publications');
const User = require('../models/User');

exports.addNewOffer = async (title, technique, image, certificate, author) => {
    const offer = await Publications.create( { title, technique, image, certificate, author } );

    const user = await User.findById(author);
    await user.publications.push(offer);
    await user.save();
};

exports.updateOffer = (offerId, title, technique, image, certificate) => Publications.findByIdAndUpdate(offerId, { title, technique, image, certificate }, { runValidators: true });

exports.del = (offerId) => Publications.findByIdAndDelete(offerId);
