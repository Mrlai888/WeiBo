---
title: "webpack"
---

## webpack

1. 现代化前端最流行的一款 构建打包工具

### webpack 打包构建原理

1. 基于某个入口文件，分析这个文件中的依赖，接着继续向下寻找依赖所属的依赖

循环往复，直到没有依赖为止，最后进行打包处理

### webpack 核心

1. 入口（entry）
2. 出口（output）
3. 转换器 依赖 (loader)
4. 插件 （plugin）

### webpack 简易搭建流程

1. 新建文件 mkdir webpack-demo //终端（Linux）

2. 初始化 npm init -y / yarn init -y

3. 安装开发依赖 npm install -D webpack webpack-cli /yarn add webpack webpack-cli -D (最好选择本地安装，不创建多个 webpack 项目是会冲突 ）

### 运行 webpack 三种方法

1. ./node_modules/bin/webpack（错误） node_modules\bin\webpack(需使用反斜杠 ）
2. npx webpack
3. npm 脚本方式 ：npm run build

```js
// package.json
  "scripts": {
    "build": "webpack",
    "start": "webpack-dev-server"
  },
```

1. 更多内容查看官网[官网](https://www.webpackjs.com/concepts/)

2. 配置文件都在 webpack.config.js 文件完成

### 配置入口出口

```js
module.exports = {
  // 入口
  entry: "./src/index.js",
  // 出口
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
}

// __dirname  相对路径  __filename 绝对路径
```

### 常用插件

1. 自动生成 dist/index.html 的插件：html-webpack-plugin ,
   安装插件：

```js
npm install --save-dev html-webpack-plugin
```

配置插件：

```js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") // 引入
plugins: [
  new HtmlWebpackPlugin({
    // 可以传递一个template选项，来控制使用哪个模板页面来生成
    template: path.resolve(__dirname, "./public/index.html"),
  }),
]
```

2. copy-wepack-plugin 插件 可以将某个 文件里的内容全部考至到出口文件

安装插件：

```js
npm install --save-dev copy-webpack-plugin
```

配置插件：

```js
//比如：把public 文件里的内容全部考到出口文件（dist）
const CopyWebpackPlugin = require("copy-webpack-plugin") // 引入
plugins: [
  new CopyWebpackPlugin([
    {
      // 将 public 文件夹中的文件内容，全部拷贝至 出口文件夹中
      from: path.resolve(__dirname, "./public"),
    },
  ]),
]
```

### 常用转换器

1. 安装 css 转换器

- css-loader: 将 css 文件转换成 webpack 能够识别的模块文件
- style-loader: 将 css 写入到 html 页面的 style 标签中

```js
npm install -D style-loader css-loader
```

2. 安装 scss 转换器

```js
npm install -D sass-loader node-sass
```

3. 安装图片转换器

```js
npm install -D url-loader
```

```js
module: {
  rules: [
    //加载css
    {
      test: /\.css$/,
      //多个转换器使用时用倒序手法
      use: ["style-loader", "css-loader"],
    },
    // 加载图片
    {
      test: /\.(png|jpg|gif|svg)$/,
      use: ["file-loader"],
    },
    //加载sass
    {
      test: /\.(scss|sass)/,
      use: ["style-loader", "css-loader", "sass-loader"],
    },
  ]
}
```

## webpack+ts+react

### 脚手架生成

```js
yarn create react-app my-test-app --template typescript

```

### 自主搭建

1. 安装 react 相关模板

```js

npm install react react-dom --save-dev
npm install -D @types/react @types/react-dom

```

2. 安装 webpack 模块

```js

npm install -D webpack webpack-cli webpack-dev-server

```

3. 安装 typescript

```js

npm install -D typescript

```
4. 如果需要使用 Sass 和 SCSS，我们需要其他的 loader

```js
npm i node-sass sass-loader style-loader css-loader --save-dev
```
5. 将ts代码编译成js代码模块

```js
npm install -D awesome-typescript-loader

```
6. babel模块
```js
npm install -D babel babel-core babel-preset-latest babel-preset-react
```
7. 初始化
```js

下载模块之后，生成node_modules和package-lock.json文件，需要手动生成package.json文件。生成tsconfig.json文件。
npm init
tsc --init

```

#### 新建webpack.config.js文件

```js
const path = require("path")
const webpack = require("webpack")
const  HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
// 入口文件
  entry: './src/index.tsx', 
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
      // 解析jsx文件类型
        test:/\.jsx?$/,
        // 
        use:{
          loader:"babel-loader",
          options:{
           presets:["@babel/env","@babel/react"]
       	  }
        }
      },
      //配置sass
      {
        test: /\.s(a|c)ss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }],
       },
       {
         test: /\.ts(x?)$/,
         use: [
           {
             loader: 'awesome-typescript-loader',
             options: {}
           }
         ]
       }
    ]
  },
  // 文件引用不需要后缀名 import xx from 'xxx'
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'] 
  },
  devServer: {
    inline: true, //实时刷新
    hot: true, // 模块热替换机制
    host: '0.0.0.0', //设置服务器的主机号，默认是localhost
    port: 9000,
    compress: true,
    open: true // 打开浏览器，默认false
  },
  // plugins: [
  //   new HtmlWebpackPlugin({ //打包输出HTML
  //     filename: './index.html',  // public/index.html
  //     template: 'index.html'
  //   }),
  //   // new webpack.HotModuleReplacementPlugin()
  // ],
  mode: "development"
}

```

#### 新建.babelrc 文件，配置如下
```js

{
  "presets": ["react", "es2015", "stage-0"]
}

```
```js
index.tsx

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/index'

ReactDOM.render (
  <App/>,
  document.getElementById("root")
)
```

```js
app.tsx

import React from 'react'


function App({

}){
return (
  <div><div/>
)
}
```

#### 在package.json文件里配置启动命令：
```js
"scripts": {
    "start": "webpack-dev-server --config webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
