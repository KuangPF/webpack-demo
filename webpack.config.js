let webpackHtmlPlugin = require('webpack-html-plugin');
let extractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');
let webpack = require('webpack');
let openBrowserPlugin = require('open-browser-webpack-plugin');
let merge = require('webpack-merge');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var currentTarget = process.env.npm_lifecycle_event;

var PATHS = {
    libsPath: path.resolve(process.cwd(), './libs'),
    srcPath: path.resolve(process.cwd(), 'src'),
    node_modulesPath: path.resolve('./node_modules'),
}
console.log(path.resolve(PATHS.libsPath,'/js/flexbile/flexible.debug.js'));
const config = {
    entry: {
        index: './src/js/index.js',
        flexible: path.resolve(PATHS.libsPath,'/js/flexbile/flexible.debug.js'),
        flexibleCss: path.resolve(PATHS.libsPath,'/js/flexbile/flexible_css.debug.js'),
    },

    output: {
        path: path.resolve(__dirname + '/dist'),
        publicPath: '/dist/',
        filename: 'static/js/[name].js'
    },

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    }
                }
            }, {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            },
            {
                test: /\.(css|scss)$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: currentTarget == 'build' ? true:''
                            }
                        },
                        'sass-loader',
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.(png|gif|svg|jpe?g)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'static/img/[name]-[hash:8].[ext]'
                    }
                }]
            }, {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },

    plugins: [
        new extractTextPlugin({
            filename: 'static/css/[name].css',
            allChunks: true
        }),

        new webpackHtmlPlugin({
            filename: 'index.html',
            template: __dirname + '/src/index.html',
            inject: true,
            chunks: ['flexible','flexibleCss','index'],
            favicon: './favicon.ico',
            minify: {
                removeComments:true,
                collapseWhitespace:true,
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name:['flexible','flexibleCss'],
            filename:'static/js/[name].js'
        }),
        new openBrowserPlugin({
            url: 'http://localhost:8080/dist/index.html'
        }),
    ],

    resolve: {
        extensions: [".js", ".json"]
    }

}


if (currentTarget == 'build') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ // js、css都会压缩
            mangle: {
                except: ['$super', '$', 'exports', 'require', 'module', '_']
            },
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            }
        })
    )
   /*  module.exports = merge(config, {
        module: {
            loaders: [{
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: true //css压缩
                            }
                        },
                        'postcss-loader'
                    ]
                })
            }, ]
        }
    }) */
}
module.exports = config