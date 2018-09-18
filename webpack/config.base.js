
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.join(__dirname, '../');
const dotenvLocal = path.join(rootPath, '/.env.local');

dotenvOverride();

const publicPath = process.env.PATH_ROOT;

module.exports = {
    devtool: 'source-map',
    entry: {
        'app': path.join(rootPath, 'src/index.tsx'),
        'vendor': [
            'react',
            'react-dom',
            'styled-components'
        ]
    },
    output: {
        path: path.join(rootPath, 'dist'),
        publicPath: publicPath
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@app': rootPath
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    },
                    {
                        loader: 'stylelint-custom-processor-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(createVarsDefinePlugin()),
        new HtmlWebpackPlugin({ template: path.join(rootPath, 'public/index.html') }),
    ],
    optimization: {
        runtimeChunk: true,
        splitChunks: { chunks: 'all' },
        namedChunks: true
    }
}

function createVarsDefinePlugin() {
    const newVars = {};
    const envConfig = dotenv.config().parsed;
    const envLocal  = process.env.NODE_ENV ? {} : dotenv.parse(fs.readFileSync(dotenvLocal));
    const envMerge  = Object.assign({}, envConfig, envLocal);
    for (let k in envMerge) {
        newVars['process.env.' + k] = JSON.stringify(envMerge[k]);
    }
    return newVars;
}

function dotenvOverride() {
    if(process.env.NODE_ENV){
        dotenv.config();
        return;
    }
    const envConfig = dotenv.parse(fs.readFileSync(dotenvLocal));
    for (let k in envConfig) {
        process.env[k] = envConfig[k]
    }
}