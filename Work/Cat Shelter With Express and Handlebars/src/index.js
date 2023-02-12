const express = require('express');
const mongoose = require('mongoose');

const viewEngineSetUp = require('./config/viewEngine');
const router = require('./routs');
const dataBaseInit = require('./config/dataBaseInit');

const app = express();
const port = 5000;
viewEngineSetUp(app);

mongoose.set('strictQuery', false);
app.use(express.urlencoded( {extended: false} ));
app.use(express.static('src/content'));
app.use(router);

dataBaseInit()
    .then(() => app.listen(port, () => {console.log(`The server is online and is running on port ${port}...`)}))
    .catch((err) => console.error(err.message))
