const merge = require('webpack-merge');
const baseConfig = require('./config.base.js');
module.exports = merge(baseConfig, {
    output: {
        filename: '[name].js'
    },
    optimization: {
        minimize: true
    },
    mode: 'production'
});