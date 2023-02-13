const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

exports.getHomePageController = async (req, res) => {
    let cubeInfo = await Cube.find().lean();

    const {search, from, to} = req.query;

    if (search) {
        cubeInfo = cubeInfo.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    } 

    if (from) {
        cubeInfo = cubeInfo.filter(cube => cube.difficultyLevel >= from);
    } 

    if (to) {
        cubeInfo = cubeInfo.filter(cube => cube.difficultyLevel <= to);
    } 

    res.render('index', { cubeInfo });
};

exports.getAboutPageController = (req, res) => {
    res.render('about');
};

exports.getCreatePageController = (req, res) => {
    res.render('create');
};

exports.getDetailsPageController = async (req, res) => {
    const cubeId = req.params.cubeId;
    const cubeInfo = await Cube.findById( cubeId ).populate('accessories').lean();

    res.render('details', { cubeInfo });
};

exports.getErrorPageController = (req, res) => {
    res.render('404');
};

exports.getAttachAccessoryPageController = async (req, res) => {
    const cubeId = req.params.cubeId;

    const cubeInfo = await Cube.findById( cubeId ).lean();
    const accessoryInfo = await Accessory.find().lean();

    res.render('attachAccessory', { cubeInfo, accessoryInfo });
};

exports.getCreateAccessoryPageController = (req, res) => {
    res.render('createAccessory');
};
