const errorHandler = (err) => {
    const error = Object.values(err.errors)[0];

    return error;
}

module.exports = errorHandler;
