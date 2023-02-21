const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const router = require('./router');
const authentication = require('./middleware/authMiddleware');

const app = express();

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(authentication.authentication);
app.use(router);

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/demoData');

app.listen(3000, () => {console.log('Server is online and is running on port 3000...')});