const config = {
    production: {
        PORT: 5050,
        DEV_URL: '',
        SECRET: 'IKnowYourSecret'
    },
    development: {
        PORT: 5000,
        DEV_URL: 'mongodb://127.0.0.1:27017/cubeDatabase',
        SECRET: 'ImNotGoingToTellYouMySecret'
    }
};

module.exports = config[process.env.node_env || 'development'];
