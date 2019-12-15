const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/test.ts',
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
                    limit: 100,
                    name: '[name].[ext]', 
                    esModule: false
                },
            },
            { test: /\.tsx?$/, loader: "ts-loader",

                options: {
                    //appendTsSuffixTo: [/\.vue$/]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
                              template: './index.html',
        }),
        new VueLoaderPlugin(),
        new CopyPlugin([
            { from: 'src/assets', to: 'assets' }
        ]),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json', 'ts', 'tsx'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
};
