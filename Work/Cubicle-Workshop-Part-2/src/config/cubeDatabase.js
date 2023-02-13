const mongoose = require('mongoose');

async function cubeDatabase () {
    await mongoose.connect('mongodb://127.0.0.1:27017/cubeDatabase');

    console.log('DB connected');
}

module.exports = cubeDatabase;
