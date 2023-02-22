const Trip = require('../models/Trip');
const User = require('../models/User');

exports.addNewProduct = async (start, end, date, time, image, brand, seats, price, description, creator) => {
    const trip = await Trip.create( { start, end, date, time, image, brand, seats, price, description, creator } );
    const user = await User.findById(creator);
    await user.trip.push(trip);
    await user.save();
};

exports.updateProduct = (start, end, date, time, image, brand, seats, price, description, productId) => Trip.findByIdAndUpdate(productId, { start, end, date, time, image, brand, seats, price, description }, { runValidators: true });

exports.del = (productId) => Trip.findByIdAndDelete(productId);