const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { authorization } = require('./middleware/authMiddleware');

const router = require('./router');
const config = require('./config');
const database = require('./config/database');
const viewEngin = require('./config/viewEngine');

const app = express();
viewEngin(app);

mongoose.set('strictQuery', false);
app.use(express.urlencoded({'extended': false }));
app.use(express.static('src/static'));
app.use(cookieParser());
app.use(authorization);
app.use(router)

database()
    .then(() => (app.listen(config.PORT, () => {console.log(`Server is online and is running on port ${config.PORT}...`);})))
    .catch((err) => console.error(err.message))
