const { addCube, deleteCube, editCube } = require('../manager/cubeManager');
const { addAccessory } = require('../manager/accessoryManager');
const { attachAccessory } = require('../manager/attachManager');
const errorHandler = require('../utils/errorUtil');

exports.postCreateCube = async ( req, res ) => {
    const userId = req.user.id;
    const { name, description, imageUrl, difficultyLevel } = req.body;

    try {
        await addCube(name, description, imageUrl, difficultyLevel, userId);
    } catch(error) {
        const err = errorHandler(error);
        return res.render('createCube', { err: err.message });
    }
  
    res.redirect('/');
};

exports.postCreateAccessory = async (req, res) => {
    const { name , description, imageUrl } = req.body;

    try {
       await addAccessory(name, description, imageUrl);
    } catch(error) {
        const err = errorHandler(error);
        return res.render('createAccessory', { err: err.message });
    }

    res.redirect('/');
};

exports.postAttachAccessory = (req,res) => {
    const cubeId = req.params.cubeId;

    const accessoryId = req.body.accessory;
    attachAccessory(accessoryId, cubeId);

    res.redirect(`/details/${cubeId}`)
};

exports.postDeleteCube = async (req, res) => {
    const cubeId = req.params.cubeId;

    try {
        await deleteCube(cubeId);
    } catch(err) {
        console.log(err);
        return res.redirect('/404');
    }

    res.redirect('/');
};

exports.postEditCube = (req,res) => {
    const cubeId = req.params.cubeId;
    const { name, description, imageUrl, difficultyLevel} = req.body;

    if (name === '' || description === '' || imageUrl === '' || difficultyLevel === '') {
        return res.redirect('/404');
    };
  
    editCube(cubeId, name, description, imageUrl, difficultyLevel);

    res.redirect(`/details/${cubeId}`);
};
