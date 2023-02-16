const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const { result } = require('../manager/homeManager');
const { cubeOwner } = require('../manager/cubeManager');

exports.getHomePage = async (req, res) => {
    const { search, from, to } = req.query;
    
    const allCubeInfo =  await result(search, from, to);

    res.render('index' , { allCubeInfo });
    
};

exports.getCreateCubePage = (req, res) => {
    res.render('createCube');
};

exports.getCreateAccessoryPage = (req, res) => {
    res.render('createAccessory');
};

exports.getAttachPage = async (req, res) => {
    const cubeId = req.params.cubeId;
    const cubeInfo = await Cube.findById(cubeId).lean();
    const accessoriesList = await Accessory.find().lean()

    res.render('attach', { cubeInfo, accessoriesList });
};


exports.getDetailsPage = async (req, res) => {
    const user = req.user;
    const cubeId = req.params.cubeId;
    const cubeInfo = await Cube.findById(cubeId).populate('accessories').lean();
    
    if (user) {
        const isOwner = await cubeOwner(req.user.id, cubeId);
        return res.render('details', { cubeInfo, isOwner});
    }
    
    res.render('details', { cubeInfo });
};

exports.logout = (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
}

exports.getAboutPage = (req, res) => {
    res.render('about');
};

exports.get404Page = (req, res) => {
    res.render('404');
};

exports.getEditPage = async (req, res) => {
    const cubeId = req.params.cubeId;
    const cubeInfo = await Cube.findById(cubeId).lean();

    res.render('edit', { cubeInfo });
};

exports.getDeletePage = async (req, res) => {
    const cubeId = req.params.cubeId;
    const cubeInfo = await Cube.findById(cubeId).lean();

    res.render('delete', { cubeInfo });
};