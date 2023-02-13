const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

exports.postNewCubeController = async (req, res) => {

    const { name, description, imageUrl, difficultyLevel } = req.body;

    const newCube = new Cube({ name, description, imageUrl, difficultyLevel });

    await newCube.save();

    res.redirect('/');
};

exports.postNewAccessoryController = async (req,res) => {

    const { name, description, imageUrl } = req.body;

    const newAccessory = new Accessory({ name, description, imageUrl });

    await newAccessory.save();

    res.redirect('/');
};

exports.postAccessoryController = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId);
    const accessoryId = req.body.accessory;

    cube.accessories.push(accessoryId);
    await cube.save();

    res.redirect(`/cube/details/${req.params.cubeId}`);
};
