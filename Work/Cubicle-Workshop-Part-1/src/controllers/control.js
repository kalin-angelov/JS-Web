exports.inputControl = (req, res, next) => {

    const { name, description, imageUrl, difficultyLevel } = req.body;
    if (name === '' || description === '' || imageUrl === '' || difficultyLevel === '') {
        return res.redirect('/404');
    }
    next();
};
