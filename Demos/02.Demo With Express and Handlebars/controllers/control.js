const db = require('../data/db.json');

exports.idControl = (req, res, next) => {
    if (req.params.id > db.length) {
        return res.redirect('/404');
    }
    next();
};

exports.inputControl = (req, res, next) => {
    const { name, breed, age, weight, image } = req.body;
    if (name === "" || breed === "" || age === "" || weight === "" || image === "") {
       return res.redirect('/404');
    };
    next();
};
