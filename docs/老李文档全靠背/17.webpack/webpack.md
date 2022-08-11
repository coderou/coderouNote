# webpack 快速入门教程

## 1、webpack 简介

- webpack = Web Package

- Webpack 是一个现代 JS 应用程序的静态模块打包器(module bundler)

  - 模块（模块化开发，提高开发效率，避免重复造轮子）
  - 打包（将各个模块，按照一定的规则组装起来）

- 图例：

  - 模块化打包

    ![TPQO4s.png](https://s4.ax1x.com/2021/12/16/TPQO4s.png)

  - 构建过程：把不支持的代码转为支持的代码

    ![TPl9DU.png](https://s4.ax1x.com/2021/12/16/TPl9DU.png)

  - 打包过程：把多个文件合并成一个文件

    ![TPQJnU.png](https://s4.ax1x.com/2021/12/16/TPQJnU.png)

  - 打包构建过程

    ![TPQYBF.png](https://s4.ax1x.com/2021/12/16/TPQYBF.png)

- 功能

  - 将多个文件合并打包，减少 http 请求次数，提高效率
  - 对代码进行编译，确保浏览器兼容性
  - 对代码进行压缩，减少文件体积，提高加载速度
  - 检测代码格式，确保代码质量
  - 提高热更新服务，提高开发效率
  - 针对不同环境，提供不同的打包策略

- 特点

  - 功能强大（打包、构建、发布 Web 服务）
  - 学习成本高

- webpack 发展

  - 2012 年 3 月 10 日：Webpack 诞生
  - 2014 年 2 月，webpack1
  - 2016 年 12 月，webpack2
  - 2017 年 6 月，webpack3
  - 2018 年 2 月，webpack4
  - 2020 年 10 月，webpack5

## 2、小试牛刀

- 初始化项目：

  - 生成 package.json 文件
  - 命令：`npm init -y`

- 创建入口文件
  - project/src/index.js
- 安装 webpack
  - `npm install webpack webpack-cli -D`
  - `npm install webpack webpack-cli -g`
- 运行指令
  - 开发配置指令：` webpack ./src/index.js -o ./build/js --mode=development`
    - 功能: webpack 能够编译打包 js 和 json 文件，并且能将 es6 的模块化语法转换成浏览器能识别的语法
  - 生产配置指令：` webpack ./src/index.js -o ./build/js --mode=production`
    - 功能: 在开发配置功能上加上一个压缩代码
- 结论：
  - webpack 能够编译打包 js 和 json 文件
  - 能将 es6 的模块化语法转换成浏览器能识别的语法
  - 能压缩代码
- 缺点：
  - 不能编译打包 css、img 等文件
  - 不能将 js 的 es6 基本语法转化为 es5 以下语法

## 3、了解 Webpack 相关内容

1. 五大“护法”

- Entry：入口起点(entry point)

  - 打包时，第一个被访问的源码文件，指示 webpack 应该使用哪个模块（webpack 中一切都是模块），来作为构建其内部依赖图的开始。
  - 默认是 src/index.js(可以通过配置文件指定)
  - webpack 可以通过入口，加载整个项目的依赖

- Output：出口

  - 打包后，输出的文件名称
  - 默认是 dist/main.js(可以通过配置文件指定)

- Loader：加载器

  - loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只能解析 JavaScript）。
  - 命名方式：XXX-loader(html-loader\html-loader/.....)

- Plugins：插件

  - 实现 loader 之外的其他功能(打包优化和压缩等)
  - 是 Webpack 的支撑，用来实现丰富的功能
  - 命名方式：xxx-webpack-plugin(html-webpack-plugin)。

- Mode：模式

  - 生产模式 production

  - 开发模式 development

## 4、使用 webpack 配置文件

- 目的：在项目**根目录**定义配置文件，通过自定义配置文件，还原以上功能

- 文件名称：`webpack.config.js`，这个文件是以 CommonJS 规范进行组织的，使用 Webpack 的过程，大部分就是跟配置文件打交道的过程

- 文件内容：

  ```js
  const { resolve } = require('path'); // node内置核心模块，用来设置路径。

  module.exports = {
    //打包模式
    mode: 'production', //还有development模式
    //入口文件
    entry: './src/index.js',
    //出口文件
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'main.js',
    },
    //模块配置，配置loader
    module: {
      rules: [],
    },
    //插件配置
    plugins: [],
  };
  ```

- 运行指令： `webpack`

## 5、打包详细配置

### 5.1 打包 CSS

#### 5.1.1 基本打包

- 打包 CSS 包含：打包逻辑、打包 LESS、打包成独立的 CSS 文件、添加样式前缀、格式校验、压缩 CSS

  - css-loader：将 CSS 转换为 JS(将 css 输出到打包后的 js 文件中)
  - style-loader:把包含 CSS 内容的 JS 代码，挂载到页面的 style 标签中

- 需要在入口文件引入 CSS（import './css/main.css'）

- 匹配后缀名:`test: /\.css$/i,`

- 加载器配置：`use: ["style-loader",'css-loader']`

- 安装`npm i css-loader style-loader -D`

  ```js
  rules: [
    {
      test: /\.css$/i,
      use: [
        //use中loader加载是有顺序的，先下后上，注意有的loader需要按照顺序书写
        'style-loader',
        'css-loader',
      ],
    },
  ];
  ```

#### 5.1.2 打包 less

- less-loader：打包 less 的加载器

- 匹配后缀名:`test: /\.less$/i,`

- 加载器配置：`use: ["style-loader",'css-loader',"less-loader"]`

- 安装`npm i less less-loader -D`

  ```js
  rules: [
    {
      test: /\.less$/i,
      use: [
        //use中loader加载是有顺序的，先下后上，注意有的loader需要按照顺序书写
        'style-loader',
        'css-loader',
        'less-loader',
      ],
    },
  ];
  ```

#### 5.1.3 将 css 打包成独立的文件

- 安装插件:`npm i mini-css-extract-plugin -D`

- 引入插件：`const MiniCssExtractPlugin = require('mini-css-extract-plugin')`

- 使用`MiniCssExtractPlugin.loader`替换 style-loader ：`use: [MiniCssExtractPlugin.loader,'css-loader',"less-loader"]`

- 配置插件（new MiniCssExtractPlugin({}）

  ```js
  //插件配置
  plugins: [
    new MiniCssExtractPlugin({
      //输出独立文件的文件名
      filename: 'css/[name].css',
    }),
  ];
  ```

#### 5.1.4 添加样式前缀

- 安装：`postcss`和`postcss-loader`和`autoprefixer`

- 配置 loader

  `use: [MiniCssExtractPlugin.loader,'css-loader',"postcss-loader"]`

- 新建`postcss.config.js`

  - `module.exports = { plugins: [require('autoprefixer')]}`

- 配置需要兼容的浏览器
  - package.json 中指定 browserslist
  - `"browserslist": [ "last 1 version", ">1%" ]`

#### 5.1 5 校验 css 代码格式

- 安装：`stylelint stylelint-config-standard(规则集) stylelint-webpack-plugin(让webpack中可以使用stylelint)`
- 引入：`const StylelintPlugin=require("stylelint-webpack-plugin");`
- 配置 plugin：`new StylelintPlugin({files: ['src/css/*.{css,less,sass,scss}']})`
- 指定校验规则(在 package.json 中指定 stylelint)
  - `"stylelint":{"extends":"stylelint-config-standard","rules": { "at-rule-no-unknown": [false]}}`

#### 5.1.6 css 的压缩

- 安装：`CssMinimizerWebpackPlugin`

- 引入：`const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");`

- 在 webpack 中添加新的配置：

  ```js
   optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
      minimize: true,
    },

  ```

### 5.2 打包 html

- 安装`npm install --save-dev html-webpack-plugin`

  - 主要为了生成 html 文件（用户服务器访问），并在 html 中加载所有的打包资源
  - 指定 html 模板，压缩 html 等

- 引入：`const HtmlWebpackPlugin = require('html-webpack-plugin');`

- 配置插件：`new HtmlWebpackPlugin({filename: "index.html",template: "./src/index.html" })`

- 可以在插件中配置`minify`来进行压缩

  ```
  minify: {
      collapseWhitespace: true,
      keepClosingSlash: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
  }
  ```

### 5.3 编译 JS

#### 5.3.1 基本编译

- 目的：将 ES6 转成 ES5，从而保证 js 在低版本的浏览器的兼容性

- 安装：`npm install --save-dev babel-loader @babel/core @babel/preset-env（包含最新的转换规则）`

- 配置

  ```js
  rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { targets: 'defaults' }]],
        },
      },
    },
  ];
  ```

#### 5.3.2 完全编译

- @babel/preset-env 只能转义基本语法（promise 不能转换）
- @babel/polyfill（转换所有 js 语法）
  - `npm i @babel/polyfill -D`
  - `import '@babel/polyfill'`(入口文件中引入)

#### 5.3.3 按需编译

- core.js(按需转义 JS 语法)

- 安装：`npm i core-js -D`

- 配置：

  - 按需加载 useBuiltIns:"usage"

  - 指定版本 corejs:3

    ```
    rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                 ['@babel/preset-env', {
                     useBuiltIns:"usage",
                     corejs:3,
                     targets: "defaults"//可以指定浏览器及版本
                 }]
              ]
            }
          }
        }
      ]
    ```

#### 5.3.4 JS 格式校验

- 安装：`npm i eslint eslint-config-airbnb-base eslint-webpack-plugin eslint-plugin-import -D`
  - eslint 检验 js 代码格式的工具
  - eslint-config-airbnb-base：最流行的 js 代码格式规范
  - eslint-webpack-plugin：webpack 中使用 eslint
  - eslint-plugin-import：用于在 package.json 中读取 eslintConfig 的配置
- 配置
  - eslint-webpack-plugin
    - 引入：`const ESLintPlugin = require('eslint-webpack-plugin')`
    - plugins:[new ESLintPlugin({})]:配置可以传入一个 fix: true，自动修复
  - eslintConfig(package.json)
    - 'eslintConfig':{'extends':'airbnb-base'}
  - // eslint-disable-next-line：对下一行代码不进行 eslint 校验

### 5.4 资源模块（Asset Modules）

- asset/resouce:发送一个单独的文件并导出 URL（之前通过 file-loader 实现）
- asset/inline:导出一个资源的 data URI（之前通过 url-loader 实现）
- asset/source:导出资源的源代码（之前通过使用 raw-loader 实现）
- asset:在导出一个 data URL 和发送一个单独的文件之间自动选择

### 5.5 打包图片

- 模块的方式引入图片

  - ```js
    // 以模块的方式引入图片
    import dog from './image/01.jpg';
    const img = new Image();
    img.src = dog;
    document.body.appendChild(img);
    ```

  - loader 配置：

    ```js
    {
        test: /\.(png|jpg|gif|svg)$/,
        //asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。代替之前的url-loader和file-loader
        type: "asset",
        parser: {
            dataUrlCondition: {
                maxSize: 15 * 1024, // 小于15kb以下的图片会被打包成base64格式
            },
        },
        generator: {
            filename: 'images/[name][ext]'
        }
    }
    ```

- css 中引入图片

  - 在 less 和 css 的文件配置中的 `MiniCssExtractPlugin.loader`配置上 css 的资源路径

    ```js
     // MiniCssExtractPlugin.loader,
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: '../'
        }
    },
    ```

- 打包 html 中引入的图片

  - 引入模块`html-loader`:将 HTML 导出为字符串，会把资源引入换成 import 引入

  - ```
    {
    	test: /\.(htm|html)$/i,
    	use: {
    		loader: 'html-loader'
    	}
    }
    ```

### 5.6 打包字体文件

- 直接配置 asset Module 即可

  ```js
  {
      test: /\.(eot|svg|ttf|woff|woff2)$/i,
      type: 'asset/resource',
      generator: {
          filename: 'font/[name][ext]'
      }
  },
  ```

### 5.7 打包公共文件

- 公共文件指的是不需要编译的，直接复制到打包目录

- 使用`copy-webpack-plugin`插件

  ```js
  const CopyWebpackPlugin = require("copy-webpack-plugin")
  //plugin
  new CopyWebpackPlugin({
      patterns: [{
          from: "src/public",
          to: "public"
      }],
  }),
  ```

### 5.8 每次打包前删除之前打包文件

- 插件 `clean-webpack-plugin`

- 配置

  ```js
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  //plugin
  new CleanWebpackPlugin();
  ```

### 5.8 Dev Server 自动编译打包运行

- webpack dev server 作用：发布 web 服务，提高开发效率

- 安装

  - `npm install webpack-dev-server -D`

- 修改 webpack 配置对象（注意不是 loader 中）

  ```js
  devServer: {
    port: 8080, // 端口号
    open: true,  // 自动打开浏览器
    compress: true, //启动gzip压缩
    liveReload:true,//启动自动更新
  },
  ```

- 运行指令：`webpack serve`

## 6、Webpack 区分环境打包

- webpack.dev.conf.js：可以进行开发环境配置
- webpack.prod.conf.js：可以进行生产环境配置
- 执行打包的时候，指定配置文件(webpack --config webpack.[dev|prod].con.js)

## 7、配置快速启动程序

- package.json 文件有一个 scripts 字段，可以用于指定脚本命令，供 npm 直接调用
  - 比如配置一个脚本命令 start：'webpack --config webpack.dev.js',则可以直接通过 npm run start 启动这条命令
- 指令快捷操作，我们可以随意自定义，那向我们常见的 test 与 start 只是自定义中的一个，与其他有稍微不同之处便是 start 和 test 属于特殊命令，可以省略 run。

## 8、配置 serve

- serve 包可以为静态站点、单页应用程序或只是一个静态文件（无论是在您的设备上还是在本地网络上）提供服务

- 安装和使用
  - npm i serve -g
  - serve -s XXX
