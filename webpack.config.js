const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    entry: "./src/test.ts",
    output: {
        // filename: "bundle.js",
        // path: '/mnt/c/Users/hsnks/Downloads/'
    },
    mode: "none",
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: false }
                    }
                ]
            },
            {
                test: /\.ts$/,
                use: ['ts-loader']
            },
            {
                test: /\.js$/,
                include: [ path.resolve(__dirname, "justMySources") ],
                enforce: 'post',
                use: { loader: 'obfuscator-loader', options: {/* options here */} }
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
                              template: './public/index.html', // public/index.html 파일을 읽는다.
                              filename: 'index.html' // output으로 출력할 파일은 index.html 이다.
        }),
        new JavaScriptObfuscator({
                                 rotateUnicodeArray: true
        }, [''])
    ]
};
