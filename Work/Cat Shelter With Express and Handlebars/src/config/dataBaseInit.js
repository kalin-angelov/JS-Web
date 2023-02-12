const mongoose = require('mongoose');

async function dataBaseInit () {

    await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');
    mongoose.set("strictQuery", false);

    console.log('DB connected');
}

module.exports = dataBaseInit;