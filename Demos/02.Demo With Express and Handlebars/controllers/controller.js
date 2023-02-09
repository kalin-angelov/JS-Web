const animalsDb = require('../data/db.json');
const Pet = require('../models/Pet');

const homePageController = (req, res) => {
    res.render('home');
};

const createPageController = (req, res) => {
    res.render('create');
};

const dashboardPageController = (req, res) => {
    res.render('dashboard', { animalsDb });
};

const detailsPageController = (req, res) => {
    let petInformation;
    animalsDb.forEach(dbId => {
        if (dbId.id == req.params.id) {
            petInformation = dbId;
        };
    });
    res.render('details', { petInformation });
};

const notFoundPageController = (req, res) => {
    res.render('404');
};

const postNewPetController = (req, res) => {
    const { name, breed, age, weight, image } = req.body;
    let pet = new Pet(name, breed, age, weight, image);
    pet.save();
    res.redirect('/dashboard');
};

module.exports = {
    homePageController,
    createPageController,
    dashboardPageController,
    detailsPageController,
    notFoundPageController,
    postNewPetController
};