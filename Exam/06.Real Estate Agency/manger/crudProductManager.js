const Housing = require('../models/Housing');
const User = require('../models/User');

exports.addNewProduct = async (name, type, year, city, image, description, pieces, owner) => {
   const offer = await Housing.create( { name, type, year, city, image, description, pieces, owner } );
   const user = await User.findById(owner);
   
   await user.housing.push(offer);
   await user.save();

};

exports.updateProduct = (productId, name, type, year, city, image, description, pieces) => Housing.findByIdAndUpdate(productId, { name, type, year, city, image, description, pieces }, { runValidators: true });

exports.del = (productId) => Housing.findByIdAndDelete(productId);
