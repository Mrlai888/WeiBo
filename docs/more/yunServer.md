---
title : '云开发'
---

## 云数据库

在操作云开发之前需要在app.js配置初始化
```js
//app.js
  onLaunch: function () {
    wx.cloud.init({
      env: wx.cloud.DYNAMIC_CURRENT_ENV,
      traceUser: true,
    })
```

### 连接云数据库
```js
// 连接数据库
const db = wx.cloud.database()
// 连接集合（表）
const dbs = db.collection('maizuo') //参数是集合的名字
Page({

})

```
### 数据库的增删查改

1. 往数据库插入数据
```js
// 链接数据库
const db = wx.cloud.database().collection('maizuo')
// 插入函数
  inset(){
    const {name,age} = this.data
    db.add({
      data:{
        name,
        age,
      }
    })
    .then(res=>{
      console.log(res)
    })
  },
```
2. 往数据库删除数据
```js
// 删除一个
db.collection('todos').doc('todo-identifiant-aleatoire').remove({
  success: function(res) {
    console.log(res.data)
  }
})
```
[删除多个数据](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/remove.html)

3. [数据库查找数据](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/remove.html)

4. [数据库改改数据](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/remove.html)

## 云存储

### 上传文件

#### 上传图片
```js
//上传图片
  uploadImg(){
    //先调用微信上传图片方法生成小程序临时文件路劲
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths


        //将tempFilePaths图片地址上传到云存储里面进行保存
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'.png', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            this.setData({
              imgId:res.fileID
            })
            //将fileID进行存储
            wx.setStorageSync("fileID", res.fileID)
          },
          fail: console.error
        })
      }
    })
  },

```
#### 上传excel文件

```js
//调用微信上传Excel方法生成excel在小程序的临时文件
  excel(){
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success(res) {
        const tempFilePaths = res.tempFiles[0].path

        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + 'demo.xlsx', // 上传至云端的路径
          filePath: tempFilePaths, // 小程序临时文件路径
          success: res => {
            console.log(res)
          },
          fail: console.error
        })
      }
    })
  },
```
#### 打开excel文档
```js
  openExcel(){
    wx.cloud.downloadFile({
      fileID: 'cloud://demo123-3o9h6.6465-demo123-3o9h6-1258638428/demo.xlsx', 
      success: res => {
        // 返回临时文件路径
        wx.openDocument({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      },
      fail: console.error
    })
  },
  ```
  ### 下载文件
  ```js
  download(){
    wx.cloud.downloadFile({
      fileID: 'cloud://maizuo-yhrv3.6d61-maizuo-yhrv3-1301283734/function getTime() { [native code] }.png'
    }).then(res => {
      // get temp file path
      console.log(res.tempFilePath)
      this.setData({
        paths1: res.tempFilePath
      })
    }).catch(error => {
      // handle error
    })
  },
  ```
  ### 删除文件
  ```js
    delFiles(){
    wx.cloud.deleteFile({
      //文件名列表
      fileList: ['1581751550613png']
    }).then(res => {
      // handle success
      console.log(res.fileList)
    }).catch(error => {
      // handle error
    })
  },
```
## 云函数

### 云函数的调用
```js
//getData/index.js 云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
return {
  sum: event.a+event.b
}
}

// 小程序中调用
getData(){ 
    console.log(666)
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getData',
      // 传给云函数的参数（由云函数入口函数的event会接受data的参数）
      data: {
        a: 4,
        b: 5,
      },
      success: function (res) {
        console.log(res.result.sum) // 9
      },
      fail: console.error
    })
  },
```

