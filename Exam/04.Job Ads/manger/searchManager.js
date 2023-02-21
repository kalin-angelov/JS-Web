const User = require('../models/User');

exports.findResult = async (search) => {
    const email = search.toLowerCase();

    const user = await User.findOne({ email }).populate('ads').lean();
    if (user) {
        const result = user.ads

        return result;
    };
   
};