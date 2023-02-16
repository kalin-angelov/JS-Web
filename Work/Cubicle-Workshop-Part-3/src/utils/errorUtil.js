const errorHandler = (err) => {
    const errors = Object.values(err.errors)[0];

    return errors;
};

module.exports = errorHandler;
