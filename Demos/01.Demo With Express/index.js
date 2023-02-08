const express = require("express");
const app = express();
const controller = require('./controllers/controller');

const port = (5000);

app.use('/css', express.static('css'));
app.use('/photo', express.static('photo'));

app.get('/', controller.homeController);
app.get('/cars', controller.carsController);
app.get('/motorcycles', controller.motorcycleController);
app.get('/download/car', controller.downloadCarController);
app.get('/download/motorcycle', controller.downloadMotorcycleController);

app.listen(port, () => {console.log(`Server is online and is running on ${port}...`)});
