const path = require('path');
const webpack = require('webpack');
const node_modules = path.resolve(__dirname, 'node_modules');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';

// 多线程解析
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

module.exports = {
    devtool: 'source-map',
    entry: {
        activity: ['webpack-hot-middleware/client', './src/containers/activity/activity.js'],
        commons: ['react', 'react-dom', 'react-router', 'react-redux', 'n-zepto', 'cbklog'],
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: "/dist/",
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'url-loader?limit=5000&name=images/[name].[ext]'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=babel'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'happypack/loader?id=css'
                })
            },
            {
                test: /.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'happypack/loader?id=less',
                }),
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: 'url-loader?limit=50000&name=font.[name].[ext]'
            }
        ]
    },
    resolve: {
        modules: ['node_modules', node_modules],
        extensions: ['.js']
    },
    plugins: [
        // 多线程解析
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader'],
            threadPool: happyThreadPool,
        }),
        new HappyPack({
            id: 'css',
            loaders: ['css-loader'],
            threadPool: happyThreadPool,
        }),
        new HappyPack({
            id: 'less',
            loaders: ['css-loader!less-loader'],
            threadPool: happyThreadPool,
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        new webpack.ProvidePlugin({
            $: 'n-zepto',
            cbkLog: "cbklog"
        }),

        // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
        // 在webpack 2中使用NoErrorsPlugin会有警告提示. 替换成NoEmitOnErrorsPlugin
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(nodeEnv)
            }
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'js/commons.js'
        }),
        new HtmlWebpackPlugin({
            title:'',
            template: './src/containers/activity/activity.html',
            filename: 'activity.html',
            chunks: ['commons', 'activity'],
            inject: true,
            hash: false
        })
    ]
};
