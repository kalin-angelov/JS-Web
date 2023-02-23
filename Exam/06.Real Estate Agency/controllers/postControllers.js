const { findResult } = require('../manager/productManager');

exports.postSearchPage = async (req,res) => {
    const search = req.body.search;
    if (search === '') {
        return res.render('search');
    }
    const result = await findResult(search);

    res.render('search', { result });
};
