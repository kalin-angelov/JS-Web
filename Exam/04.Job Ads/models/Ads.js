const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({

    headline: {
        type:String,
        required: [true, 'Headline Is Required!'],
        minLength: [4, 'Headline Must Be At Least Four(4) Character\'s!']
    },
    location:{
        type:String,
        required: [true, 'Location Is Required!'],
        minLength: [8, 'Location Must Be At Least Eight(8) Character\'s!']
    },
    name: {
        type:String,
        required: [true, 'Company Name Is Required!'],
        minLength: [3, 'Company Name Must Be At Least Three(3) Character\'s!']
    },
    description: {
        type:String,
        required: [true, 'Company Description Is Required!'],
        maxLength: [40, 'Company Description Can\'t Be More Than (40) Character\'s Long!']
    },
    author: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    applied: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]

});

const Ads = mongoose.model('Ads', adsSchema);

module.exports = Ads;
