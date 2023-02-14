const config = {
    production: {
        PORT: 5050,
        SECRET: 'iKnowYourSecret'
    },
    development: {
        PORT: 5000,
        SECRET: 'imNotGoingToTellYou:()'

    }
};

module.exports = config[process.env.node_env || 'development'];
