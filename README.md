# webpack-demo
该项目是一个简单的webpackDemo，使用常见的plugin以及loader,对一些常见的三方库进行了处理打包，使用插件将js,css,img,html单独打包，是一个单页面引用，适合刚开始接触的同学。
#### Install with npm: 
    npm install
#### start webpack-dev-server
    npm run start:dev
#### 打包
    npm run build
#### 效果
![image](https://github.com/KuangPF/webpack-demo/blob/master/src/img/webpack-demo.gif)  
### 目录结构
```
webpack-demo
    ├─dist
    |   └─static
    |   |    ├─css              //打包后的css
    |   |    ├─img              //打包后的img
    |   |    └─js               //打包后的js
    |   └─index.html            //打包后页面index.html
    ├─lib
    |   └─js
    |      └─flexible           //flexible库
    ├─node_modules              //nmp install 模块
    ├─src
    |   ├─css                    //css
    |   ├─img                    //img
    |   |─js                     //js
    |   └─index.html
    ├─.balelrc                  //es6==>es5
    ├─.gitignore
    ├─favicon
    ├─package.json              //npm脚本  项目描述
    ├─postcss.config.js         //postcss插件配置
    ├─README.md
    ├─webpack.config.js         //webbpack配置文件
```
---
### webpack.config.js
##### entry(入口)
    entry: {
        index: './src/js/index.js',
        flexible:'./libs/js/flexbile/flexible.debug.js',
        flexibleCss:'./libs/js/flexbile/flexible_css.debug.js',
    },
##### output(输出)
    output: {
        path: path.resolve(__dirname + '/dist'),
        publicPath: '/dist/',
        filename: 'static/js/[name].js'
    },

### loader
利用了一些的常见的loader来处理代码，对于这些loader的配置可以查看对应loader Gitbub上的一些说明

### plungins
比较常见的plugin
##### HTML Webpack Plugin
     new webpackHtmlPlugin({
            filename: 'index.html',  
            template: __dirname + '/src/index.html',
            inject: true,
            chunks: ['flexible','flexibleCss','index'],         //需要将一些第三方库的js自动引入到html中
            favicon: './favicon.ico',
            minify: {                                           //html的压缩配置，详情参数可参考html-minifier
                removeComments:true,
                collapseWhitespace:true,
            }
        }),


##### extract-text-webpack-plugin 
该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象

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
            }
     new extractTextPlugin({
            filename: 'static/css/[name].css',          //将打包的css放在/dis/static/css 目录下
            allChunks: true
        }),