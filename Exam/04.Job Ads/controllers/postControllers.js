const { findResult } = require('../manager/searchManager');

exports.postSearch = async (req, res) => {
    const { search } = req.body;
    
    const result = await findResult(search);

    res.render('search', { result, search });
};