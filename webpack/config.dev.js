const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./config.base.js');

module.exports = merge(baseConfig, {
    output: {
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        open: true,
        historyApiFallback: true
    },
    mode: 'development'
});