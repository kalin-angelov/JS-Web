const cubeDb = require('../data/cubeDb.json');
const Cube = require('../model/Cube');

const getCubeController = (req, res) => {
    const { search, from, to} = req.query;
    let cubes = cubeDb;

    if (search) {
        cubes = cubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        cubes = cubes.filter(cube => cube.difficultyLevel >= from);
    }

    if (to) {
        cubes = cubes.filter(cube => cube.difficultyLevel <= to);
    }
    
    res.render('index', { cubes });
};

const getAboutController = ( req, res) => {
    res.render('about');
};

const getErrorController = (req, res) => {
    res.render('404');
};

const getCreateController = (req, res) => {
    res.render('create');
};

const postCubeController = (req, res) => {
    // const { name, description, imageUrl, difficultyLevel } = req.body;
    // let cube = new Cube(name, description, imageUrl, difficultyLevel);
    // cube.save();
    // res.redirect('/');
    console.log(req.body);
}

const getDetailsController = (req, res) => {
    let id = Number(req.params.id);

    if (!id) {
        return res.redirect('/404');
    }

    let result = cubeDb.find(cube => cube.id === id);

    if (!result) {
        return res.redirect('/404');
    }

    res.render('details', { result });
};

module.exports = {
    getCubeController,
    getAboutController,
    getErrorController,
    getCreateController,
    postCubeController,
    getDetailsController
};