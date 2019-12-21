const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator'); 
const webpack = require('webpack');


module.exports = {
    entry: './src/test.ts',
    output: {
        // path: '/mnt/c/Users/hsnks/Downloads/'
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
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^7.0.0
                        options: {
                            implementation: require('sass'),
                            fiber: require('fibers'),
                            indentedSyntax: true // optional
                        },
                        // Requires sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },

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
        new JavaScriptObfuscator ({
                                  rotateUnicodeArray: true
        }, ['excluded_bundle_name.js']),
        new webpack.ProvidePlugin({
                                  $: 'jquery',
                                  jQuery: 'jquery',
                                  'window.jQuery': 'jquery'
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json', 'ts', 'tsx'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
};
