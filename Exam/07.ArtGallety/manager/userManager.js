const User = require('../models/User');

exports.userInfo = async (userId) => {
    const user = await User.findById(userId).populate('publications').lean();

    const username = user.username;
    const address = user.address;
    const userOffers = user.publications.map(offers => offers.title).join(', ');

    return { username, address, userOffers };
};  
