const Breed = require('../model/Breed');
const Cat = require('../model/Cat');

exports.postNewCatController = async (req, res) => {
    const { name, description, imageUrl, breed} = req.body;
    const newCat = await new Cat({ name, description, imageUrl, breed});

    newCat.save();
    res.redirect('/');
};

exports.postNewBreedController = async (req, res) => {
    const { breed } = req.body;
    const newBreed =  await new Breed({ breed });
    
    newBreed.save();
    res.redirect('/');
};

exports.updateCatInfoController = async (req, res) => {

    const catId = req.params.catId
    const newCatInfo = req.body;
    const catInfo =  await Cat
        .findByIdAndUpdate( catId, { $set:{
                name: newCatInfo.name ,
                description: newCatInfo.description,
                imageUrl: newCatInfo.image,
                breed: newCatInfo.breed
            }}).lean();

    
    res.render('editCat', { catInfo });
    res.redirect('/');
};

exports.shelterCatController = async (req,res) => {
    const catId = req.params.catId;
    await Cat.findByIdAndDelete( catId );

    res.redirect('/');
};