const Accessory = require('../models/Accessory');

exports.addAccessory = ( name, description, imageUrl ) => Accessory.create({ name, description, imageUrl });