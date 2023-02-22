const errorHandler = require('../utils/errorHandler');
const { addNewProduct, updateProduct, del } = require('../manager/crudProductManager');
const { findProduct } = require('../manager/productManager');

exports.getCreatePage = (req, res) => {
    const pageName = 'Create Page';
    const email = req.user.email;
    res.render('create', { pageName, email });
};

exports.getEditPage = async (req, res) => {
    const pageName = 'Edit Page';
    const email = req.user.email;
    const productId = req.params.id;
    const product = await findProduct(productId);

    res.render('edit', { pageName, email, product });
};

exports.postCreate = async (req, res) => {
    const { start, end, date, time, image, brand, seats, price, description } = req.body;
    const userId = req.user.id;
    const email = req.user.email;

    try {
        await addNewProduct(start, end, date, time, image, brand, seats, price, description, userId);
        res.redirect('/shared');
    } catch(err) {
        const error = errorHandler(err);
        return res.render('sheared', { error: error.message, email });
    }
};

exports.postEdit = async (req, res) => {
    const { start, end, date, time, image, brand, seats, price, description } = req.body;
    
    const productId = req.params.id;
    const email = req.user.email;

    try {
        await updateProduct(start, end, date, time, image, brand, seats, price, description, productId);
        res.redirect(`/details/${productId}`);
    } catch(err) {
        console.log(err);
        const error = errorHandler(err);
        return res.render('edit', { error: error.message, email });
    }
    
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    await del(productId);

    res.redirect('/shared');
};
