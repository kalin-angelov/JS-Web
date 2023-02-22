const Trip = require('../models/Trip');
const User = require('../models/User');

exports.findProduct = async (productId, userId) => {

    if (!productId) {
        const products = await Trip.find().lean()
        return products;
    }
    
    const product = await Trip.findById(productId).populate('creator').lean();
    const driver = product.creator[0].email;
    let seats = product.seats;

    if (seats === 0) {
        seats = false;
    };

    return { product, driver, seats };
};

exports.findOwner = async (productId, userId) => {
    const product = await Trip.findById(productId).populate('creator').lean();

    return product.creator.some(user => user._id.toString() === userId);
};

exports.hasJoin = async(productId, userId) => {
    const product = await Trip.findById(productId).populate('buddies').lean();
    const hasJoin = product.buddies.some(buddy => buddy._id.toString() === userId);
    
    if(hasJoin) {
        return false;
    } else {
        return true
    }
};

exports.join = async(productId, userId) => {
    const product = await Trip.findById(productId).populate('buddies');
    await product.buddies.push(userId);
    await product.save();

    const seats = product.seats - 1;
    await product.updateOne({ seats: seats });
};

exports.buddies = async(offerId) => {
    const offer = await Trip.findById(offerId).populate('buddies').lean();
    return offer.buddies;
};

exports.trips = async(userId) => {
    const user = await User.findById(userId).populate('trip').lean();
    const tripsNumber = user.trip.length;
    const allTrips = user.trip;

    return { tripsNumber, allTrips };
};