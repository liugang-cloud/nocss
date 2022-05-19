const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')



module.exports = {
    devtool: 'eval',
    mode: 'development',
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'vue-style-loader', 'css-loader', 'postcss-loader'] },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
        ]
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js",
        },
    },
    plugins: [
        new VueLoaderPlugin()
    ]

}