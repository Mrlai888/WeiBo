---
title : 'Mysql'
---

## Mysql 常用指令

```js
//  启动mysql
net start mysql

// 登录mysql
mysql -u ${用户名} -p ${密码}  // mysql -u root -p F1334003lxy

// -u 代表用户名

// -p 代表密码

// -v 代表输出版本信息并且退出

// -h 代表主机地址

// 修改密码
格式：mysql> set password for 用户名@localhost = password('新密码');

// mysql的退出

分别有exit，quit，\q

// key 不区分大小写

// 查询所有内容
SELECT * FROM 表名 // selsect * from users

// 查询表中某个字段

SELECT 字段名 FROM 表名  // select name from users


// 一、插入内容到数据表

INSERT INTO `数据库名`.`数据表名` (`t_title`, `t_con`) VALUES ('标题1', '内容1');
或这样

INSERT INTO `数据库名`.`数据表名` (`t_id`, `t_title`, `t_con`) VALUES (NULL, '标题1', '内容1');
或者这样

INSERT INTO  `数据库名`.`数据表名` SET  `t_title` =  '标题3', `t_con` =  '内容3';
批量插入是这样

INSERT INTO `数据库名`.`数据表名` (`t_title`, `t_con`) VALUES ('标题1', '内容1') , ('标题2', '内容2') ,  ('标题3', '内容3') ,  ('标题4', '内容4') ;

// 二、修改数据表中内容

改什么表？ test

改哪几列？ t_title和t_con

改为哪些值？

改哪些行的？ where...


UPDATE `test` SET  `t_title`='写个标题',`t_con`='写个内容' WHERE 唯一键属性名=1;//UPDATE `test` SET  `t_title`='写个标题',`t_con`='写个内容' WHERE id=1


// 三、删除数据表中的内容

DELETE FROM `test` WHERE 唯一键属性名=1  // DELETE FROM `test` WHERE id=1

```

## nodejs连接mysql  

[mysql教程](http://c.biancheng.net/mysql/40/)

```js

// 加载依赖
let mysql = require('mysql');

// 连接mysql
let connection = mysql.createConnection({
    host: "127.0.0.1",

    user: "root",

    password: "F1334003lxy",

    database: "users",

    port : '3306'

    connectTimeout:5000, // 设置超时时间

    multipleStatements:false // 是否允许一条sql包含多条sql
})

// 建立连接
connection.connect()

// 封装操作mysql的函数

function mysqlAction(sql){
    
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(err)
            return
        }
        console.log(`操作成功${result}`)
    })
}
// 增加
const add = " INSERT INTO `users`.`userlist` (`name`,`userid`,`password`) VALUE ('ddd',32324,'dew32432') "

mysqlAction(add)

// 查找
const search = " SELECT `NAME` FROM `userlist`" 

mysqlAction(search)

//更新

const update = "UPDATE `userlist` SET `NAME` = 'HHAHAHA' , `USERID` =222222 WHERE id=5 "

mysqlAction(update)

// 删除

const deletes = "DELETE FROM `USERLIST` WHERE ID =5"

mysqlAction(deletes)

// 关闭连
connection.end()


```

```js

// 简易实现通过node调接口请求MySQL数据

// mysqlApi.js
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: "127.0.0.1",

    user: "root",

    password: "F1334003lxy",

    database: "users",

    port: '3306',

    connectTimeout: 5000, // 设置超时时间

    multipleStatements: false // 是否允许一条sql包含多条sql
})
connection.connect()
// 封装操作mysql的函数

function mysqlAction(sql) {
    // promise 处理请求异步问题
   return  new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err.message)
            }
            resolve(result)
        })
    })
}
const add = " INSERT INTO `users`.`userlist` (`name`,`userid`,`password`) VALUE ('ddd',324,'000') "

const search = " SELECT `NAME` FROM `userlist`"

const update = "UPDATE `userlist` SET `NAME` = 'HHAHAHA' , `USERID` =222222 WHERE id=5 "

const deletes = "DELETE FROM `USERLIST` WHERE ID =5"

async function addData() {
    return await mysqlAction(add)
}

async function searchData() {
    const res =  await mysqlAction(search)
    console.log(res,'resres')
    return res
}
async function updateData() {
    return await mysqlAction(update)
}
async function deleteData() {
    return await mysqlAction(deletes)
}

module.exports = {
    addData,
    searchData,
    updateData,
    deleteData,
}

// server.js

const Koa = require('koa');
const app = new Koa();
const mysqlApi = require('./mysqlApi/index');
const Router = require('koa-router');

const router = new Router()

router.post('/user', async (ctx) => {
    // 查询数据
    const result = await mysqlApi.mysqlApi.searchData()
    console.log(result, 'result')
    //从request中获取GET请求
    let req_query = ctx.query;
    //从上下文中直接获取
    ctx.body = {
        mysqlRes: result,
        req_query,
    }
})

app.use(router.routes());
app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('启动成功')
})

```
