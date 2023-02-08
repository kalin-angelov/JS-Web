const homeController = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../css/styles.css">
            <title>Document</title>
        </head>
        <body>
            <nav>
                <a href = "/motorcycles">Motorcycle Page</a>
                <a href = "/cars">Cars Page</a>
            </nav>
            <h1>Welcome to the Moto Club</h1>
            <img src="/photo/homePage.jpg" alt="home screen" width="650" height="650">
        </body>
        </html>
    `);
};

const carsController = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../css/styles.css">
            <title>Document</title>
        </head>
        <body>
            <nav>
                <a class="button" href = "/">Back To Home Page</a>
                <a class="button" href = "/download/car">Download Img</a>
            </nav>
            <h1>This is the car page</h1>
            <img src="/photo/car(1).jpg" alt="some car" width="850" height="850">
        </body>
        </html>
    `);
};

const motorcycleController = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../css/styles.css">
            <title>Document</title>
        </head>
        <body>
            <nav>
                <a class="button" href = "/">Back To Home Page</a>
                <a class="button" href = "/download/motorcycle">Download Img</a>
            </nav>
            <h1>This is the motorcycle page</h1>
            <img src="/photo/motorcycle(1).jpg" alt="some motor bike" width="850" height="850">
        </body>
        </html>
    `);
};

const downloadCarController = (req,res) => {
    res.download('./photo/car(1).jpg');
};

const downloadMotorcycleController = (req, res) => {
    res.download('./photo/motorcycle(1).jpg');
};
module.exports = {
    homeController,
    carsController, 
    motorcycleController, 
    downloadCarController, 
    downloadMotorcycleController
};
