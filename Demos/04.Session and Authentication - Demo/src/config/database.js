const mongoose = require('mongoose');

async function dataBase () {

    await mongoose.connect('mongodb://127.0.0.1:27017/demoData');

    console.log('DB connected...');
} 

module.exports = dataBase;