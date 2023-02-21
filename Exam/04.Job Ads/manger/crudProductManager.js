const Ads = require('../models/Ads');
const User = require('../models/User');

exports.addNewProduct = async (headline, location, name, description, author) => {
   const offer = await Ads.create( { headline, location, name, description, author } );
   const user = await User.findById(author);
   await user.ads.push(offer);
   await user.save();
};

exports.updateProduct = (headline, location, name, description, productId) => Ads.findByIdAndUpdate(productId, { headline, location, name, description }, { runValidators: true });

exports.del = (productId) => Ads.findByIdAndDelete(productId);