const Cat = require('../model/Cat');
const Breed = require('../model/Breed');

exports.getHomePageController = async (req, res) => {
    let catsDataBase = await Cat.find().lean();

    const search = req.query.search;
    if (search) {
        catsDataBase = catsDataBase.filter(cat => cat.name.toLowerCase().includes(search.toLowerCase()));
    }

    res.render('index', { catsDataBase });
};

exports.getAddCatController = async (req, res) => {
    const breeds = await Breed.find().lean();

    res.render('addCat', { breeds });
};

exports.getAddBreedController = (req, res) => {
    res.render('addBreed');
};

exports.getCatInfoEditController = async (req, res) => {
    const catInfo = await Cat.findById(req.params.catId).lean();
    const breeds = await Breed.find().lean();

    res.render('editCat', { catInfo, breeds });
};

exports.getCatInfoShelterController = async (req, res) => {
    const catInfo = await Cat.findById(req.params.catId).lean();

    res.render('catShelter', { catInfo })
};
