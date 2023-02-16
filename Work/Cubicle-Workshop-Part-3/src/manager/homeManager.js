const Cube = require('../models/Cube');

exports.result = async (search, from, to) => {
    let allCubeInfo = await Cube.find().lean();

    if (search) {
        allCubeInfo = allCubeInfo.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
     }
 
    if (from) {
        allCubeInfo = allCubeInfo.filter(cube => cube.difficultyLevel >= from);
    }
 
    if (to) {
        allCubeInfo = allCubeInfo.filter(cube => cube.difficultyLevel <= to);
    }

    return allCubeInfo;
};