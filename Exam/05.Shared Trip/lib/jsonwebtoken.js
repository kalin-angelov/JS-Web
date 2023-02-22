const util = require('util');
const jwbCallback = require('jsonwebtoken');

const jwt = {
    sign: util.promisify(jwbCallback.sign),
    verify: util.promisify(jwbCallback.verify)
};

module.exports = jwt;
