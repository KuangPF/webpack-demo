# webpack-demo
该项目是一个简单的webpackDemo，使用常见的plugin以及loader,对一些常见的三方库进行了处理打包，使用插件将js,css,img,html单独打包，是一个单页面引用，适合刚开始接触的同学。
#### Install with npm: 
    npm install
#### start webpack-dev-server
    npm run start:dev
#### 打包
    npm run build
    
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