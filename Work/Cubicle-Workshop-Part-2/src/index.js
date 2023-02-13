const express = require('express');
const mongoose = require('mongoose');

const port = 5000;
const app = express();

const viewEngineSetUp = require('./config/viewEngine');
const cubeDatabase = require('./config/cubeDatabase');
const router = require('./router');

viewEngineSetUp(app);
mongoose.set('strictQuery', false);
app.use(express.static('src/static'));
app.use(express.urlencoded({'extended': false}));
app.use(router);

cubeDatabase()
    .then(() => app.listen(port, () => {console.log(`Server is online and is running on port ${port}...`)}))
    .catch((err) => console.error(err.message))