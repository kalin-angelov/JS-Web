const mongoose = require('mongoose');

const config = require('../config');

async function dataBase() {
    await mongoose.connect(config.DEV_URL);

    console.log('DB connected...');
}

module.exports = dataBase;