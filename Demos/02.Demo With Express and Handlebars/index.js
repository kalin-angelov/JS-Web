const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

const port = 5000;

const controller = require('./controllers/controller');
const control = require('./controllers/control');

app.use('/styles', express.static('styles'));
app.use('/images', express.static('images'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.use(express.urlencoded( { extended: false } ));

app.get('/', controller.homePageController);
app.get('/create', controller.createPageController);
app.get('/dashboard', controller.dashboardPageController);
app.get('/details/:id', control.idControl, controller.detailsPageController);
app.get('/404', controller.notFoundPageController);
app.post('/create',control.inputControl, controller.postNewPetController);

app.listen(port, () => {console.log(`Server is online and running on ${port}....`)});
