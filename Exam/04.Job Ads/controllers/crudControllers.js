const errorHandler = require('../utils/errorHandler');
const { addNewProduct, updateProduct, del } = require('../manager/crudProductManager');
const { findProduct } = require('../manager/productManager');

exports.getCreatePage = (req, res) => {
    const pageName = 'Create Page';
    res.render('create', { pageName });
};

exports.getEditPage = async (req, res) => {
    const pageName = 'Edit Page';
    const productId = req.params.id;
    const offer = await findProduct(productId);

    res.render('edit', { pageName, offer });
};

exports.postCreate = async (req, res) => {
    const { headline, location, name, description } = req.body;
    const userId = req.user.id;

    try {
        await addNewProduct(headline, location, name, description, userId);
        res.redirect('/catalog');
    } catch(err) {
        const error = errorHandler(err);
        return res.render('create', { error: error.message });
    }
};

exports.postEdit = async (req, res) => {
    const { headline, location, name, description } = req.body;

    const productId = req.params.id;

    try {
        await updateProduct(headline, location, name, description, productId);
        res.redirect(`/details/${productId}`);
    } catch(err) {
        const error = errorHandler(err);
        return res.render('edit', { error: error.message });
    }
    
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    await del(productId);

    res.redirect('/catalog');
};
