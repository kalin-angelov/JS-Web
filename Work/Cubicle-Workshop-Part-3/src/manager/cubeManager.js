const Cube = require('../models/Cube');
const User = require('../models/User');

exports.addCube = async ( name, description, imageUrl, difficultyLevel, userId ) => {
    try {
        const cube = await Cube.create({name, description, imageUrl, difficultyLevel});

        const user = await User.findById(userId);
        user.cube.push(cube);
        await user.save();
    } catch(err) {
        throw err;
    }
};

exports.cubeOwner = async (userId, cubeId) => {
    const userCubes = await User.findById(userId).populate('cube').lean();
    const owned = userCubes.cube.some(cube => cube._id.toString() === cubeId);
    
    return owned;
};

exports.deleteCube = (cubeId ) => Cube.findByIdAndDelete(cubeId);

exports.editCube = async (cubeId, name, description, imageUrl, difficultyLevel) => {
   const updateCube = await Cube.findByIdAndUpdate(cubeId, {name, description, imageUrl, difficultyLevel});
   await updateCube.save();

   return updateCube
};