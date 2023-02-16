const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

exports.attachAccessory = async (accessoryId, cubeId) => {
    const accessory = await Accessory.findById(accessoryId);
    const cube = await Cube.findById(cubeId);
   
    cube.accessories.push(accessoryId);
    await cube.save();
    accessory.cube.push(cubeId);
    await accessory.save();
}