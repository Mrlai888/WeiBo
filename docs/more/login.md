---
title : '后端代码'
---
## json文件实现后端服务

### 登录注册

```js
const express = require('express')
// 引入json服务
const jsonServer = require('json-server')
// axios请求
const Axios = require('axios')
// 密码验证
const bcryptjs = require('bcryptjs')
// 引入json路由
const routes = jsonServer.router('./db.json')
// 中间件
const middleWares = jsonServer.defaults()
//baseURL的URL大写然会报错connect ECONNREFUSED 127.0.0.1:80
Axios.defaults.baseURL = 'http://localhost:9090'

// 上线配置
// Axios.defaults.baseURL = 'http://212.64.68.222:9090'

const server = express()
// body请求配置
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// 跨域处理
server.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  next()
})

// 延迟处理
const timer = (time = 500) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
server.use(async (req, res, next) => {
  await timer()
  next()
})

// 自己实现接口
// http://localhost:9090/users

server.post('/sign-up', async (req, res) => {

  //利用axios拿到服务器的数据（调用json-server的user接口）
  const response = await Axios.get('/users', { params: { username: req.body.username } })
  console.log(response.data)
  if (response.data.length > 0) {
    res.send({
      code: -1,
      msg: '用户名已经被注册过了'
    })
    return
  }
  // 将数据写入数据库   password: await bcryptjs.hash(req.body.password,10)加密操作10级
  const { data } = await Axios.post('/users', {
    ...req.body,
    password: await bcryptjs.hash(req.body.password, 10),
    time: new Date().getTime()
  })
  res.send({
    code: 0,
    msg: "注册成功",
    data
  })
})
// 登录
server.post('/sign-in', async (req, res) => {
  const { username, password } = req.body
  const { data } = await Axios.get('/users', {
    params: {
      username
    }
  })
  if (data.length <= 0) {
    res.send({
      code: -1,
      msg: '用户名或密码错误'
    })
    return
  }
  const user = data[0]
  //解密对比
  const isOk = await bcryptjs.compare(password, user.password)
  if (isOk){
    res.send({
      code:0,
      msg:'登录成功',
      data:user
    })
  }else{
    res.send({
      code:-1,
      msg:'用户名密码错误'
    })
  }


})

server.use(middleWares)
server.use(routes)
server.listen(9090)

console.log('服务启动成功')


```

## express实现后端服务

### 链接数据库

```js
//安装mongodb依赖 npm install mongodb

//链接数据库文件

// 引入mongo
const mongoose = require('mongoose')

// 构建mongodb的链接地址  协议mongodb    域名：本地ip(127.0.0.1  localhost 10.36.147.48)  ;端口27017 默认  /表名（自定义：有就用原来的没有自动生成）

const url = "mongodb://127.0.0.1:27017/newExpress"

// 链接mongodb数据库 返回一个promise对象
mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("数据库链接成功")
    })
    .catch((err) => {
        console.log('数据库链接失败，异常为：' + err)
    })

// 将mongoose暴露出去
module.exports = mongoose
```
### 实例化表

```js
// 导入链接数据库模块
const mongoose = require('../configs/connetdb')

//实例化一个schema （表）  于描述集合
const schema = new mongoose.Schema({
        username: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        }
    })
    //通过mongoose.model()方法生成 当前user的模型model  将 schema 模块化
const model = mongoose.model('user', schema) //user 为表名的单数形式   新建一个表名为users的表

module.exports = model
```

### express实现登录注册
```js
const express = require("express");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("./models/user");

const server = express();

// 处理 req.body
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// 处理mongodb的链接
const uri = "mongodb://127.0.0.1:27017/damai";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch(() => {
    console.log("数据库连接失败");
  });

// 登录
server.post("/api/login", async (req, res) => {
  // 接收前端传递过来的参数
  const username = req.body.username;
  const password = req.body.password;

  let isOk = false;
  const user = await UserModel.findOne({ username });

  if (user) {
    // 比较密码是否一致
    isOk = await bcryptjs.compare(password, user.password);
  }

  if (isOk) {
    // 签发一个token
    const token = jwt.sign(
      { username: user.username, userId: user._id },
      "MYGOD"
    );

    // 将token返回给前端
    res.send({
      code: 0,
      msg: "登录成功",
      data: {
        userInfo: user.username,
        userId: user._id
      },
      token: token
    });
  } else {
    res.send({
      code: -1,
      msg: "用户名或密码不正确"
    });
  }

  res.send({
    code: 0,
    msg: "登陆成功"
  });
});

// 注册
server.post("/api/regist", async (req, res) => {
  // 获取前端传递过来的参数
  const username = req.body.username;
  const password = req.body.password;

  const user = new UserModel({
    username: username,
    password: await bcryptjs.hash(password, 10)
  });

  await user.save();

  res.send({
    code: 0,
    msg: "注册成功"
  });
});

// 定义一个校验用户TOKEN的中间件函数
const Auth = (req, res, next) => {
  const token = req.get("ACCESS_TOKEN");
  try {
    const payload = jwt.verify(token, "MYGOD");
    // 直接将 payload 的信息, 写入到req 身上, 然后续的代码直接通过req.user就能获取到当前的登录用户的信息
    req.user = payload;
    next();
  } catch (error) {
    res.send({
      code: -1,
      msg: "校验失败"
    });
  }
};

// 获取卡券 (只是为了实现用户的校验)
server.get("/api/card", Auth, async (req, res) => {
  res.send({
    code: 0,
    msg:'获取卡券成功',
    userId: req.user.userId,
    username: req.user.username
  })

  //   // 1. 获取当前的登录的用户id
  //   // 2. 返回用户的id, 和用户名

  //   // 从请求头中获取 ACCESS_TOKEN 的值
  //   const token = req.get("ACCESS_TOKEN");
  //   // 通过 jwt.verify 去校验token
  //   try {
  //     const payload = jwt.verify(token, "MYGOD");
  //     res.send({
  //       code: 0,
  //       userId: payload.userId,
  //       username: payload.username
  //     });
  //   } catch (error) {
  //       res.send({
  //           code: -1,
  //           msg: 'token验证失败'
  //       })
  //   }
});

server.listen(3000);

```