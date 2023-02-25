const Post = require('../models/Post');
const User = require('../models/User');

exports.addNewOffer = async (title, keyword, location, date, image, description, author) => {
    const offer = await Post.create( { title, keyword, location, date, image, description, author } );

    const user = await User.findById(author);
    await user.post.push(offer);
    await user.save();
};

exports.updateOffer = (offerId, title, keyword, location, date, image, description) => Post.findByIdAndUpdate(offerId, { title, keyword, location, date, image, description } , { runValidators: true });

exports.del = (offerId) => Post.findByIdAndDelete(offerId);
