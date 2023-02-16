const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const config = require('./config');
const dataBase = require('./config/database');
const router = require('./router');
const viewEngine = require('./config/viewEngine');
const authMiddleware = require('./middleware/authMiddleware')

const app = express();
viewEngine(app);

mongoose.set('strictQuery', true);
app.use(express.static('src/static'));
app.use(express.urlencoded({ 'extended': false }));
app.use(cookieParser());
app.use(authMiddleware.authentication);
app.use(router);

dataBase()
    .then(() => (app.listen(config.PORT, () => {console.log(`Server is online and is running on port ${config.PORT}.....`)})))
    .catch((err) => console.error(err.message))