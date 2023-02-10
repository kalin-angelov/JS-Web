const express = require('express');

const config = require('./config');
const setViewEngine = require('./config/viewEngine');
const router = require('./routes');

const app = express();
setViewEngine(app);

app.use(express.static('src/public'));
app.use(express.urlencoded( {extended: false }));
app.use(router);

app.listen(config.PORT, () => {console.log(`Server is online and is running on port ${config.PORT}...`)});
