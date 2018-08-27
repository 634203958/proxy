const path = require('path');
const webpack = require('webpack');
const node_modules = path.resolve(__dirname, 'node_modules');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'production';

// 多线程解析
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

let plugins = [
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

    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(nodeEnv)
        }
    }),

    new webpack.ProvidePlugin({
        $: 'n-zepto',
        cbkLog: 'cbklog'
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    new ExtractTextPlugin({
        filename: 'css/[name].[hash:6].css',
        disable: false,
        allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'js/commons.[hash:6].js'
    }),
    new HtmlWebpackPlugin({
        title: '',
        template: './src/containers/activity/activity.html',
        filename: 'activity.html',
        chunks: ['commons', 'activity'],
        inject: true,
        hash: false
    })
];

// webpack.optimize.UglifyJsPlugin ? production
if (nodeEnv === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = {
    entry: {
        activity: ['./src/containers/activity/activity.js'],
        commons: ['react', 'react-dom', 'react-router', 'n-zepto', './assets/bridge/bridge.js', './assets/share/share.js', 'cbklog']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: nodeEnv === 'production' ? '//cdn.caibeike.com/ms/activity/res/' : '/ms/activity/res/',
        filename: 'js/[name].[hash:6].js',
        chunkFilename: 'js/[name].chunk.[chunkhash:6].js'
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
    plugins: plugins
};
