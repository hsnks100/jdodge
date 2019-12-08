const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    entry: './src/test.js',
    output: {
        path: '/mnt/c/Users/hsnks/Downloads/'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
            // { test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader',
            //     options: { esModule: false},
            // },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader', options: {
                    limit: 100000,
                    esModule: false
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
                              template: './index.html',
        }),
        new VueLoaderPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
};
