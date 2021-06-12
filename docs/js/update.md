---
title: "js进阶"
---
## js进阶

### 发布订阅模式

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>发布订阅模式</title>
</head>

<body>
    <button class="btn1">关注户型A</button>
    <button class="btn2">关注户型B</button>
    <button class="btn3">关注户型C</button>

    <!-- 发布消息 -->
    <button class="senda">发布户型A消息</button>
    <button class="sendb">发布户型B消息</button>
    <button class="sendc">发布户型C消息</button>
    <!-- <script src="../tool.js"></script> -->
    <script src="../tool.js"></script>
    <script>
        var saleOffice = {
            clientList: {
                // "A":[],//"A"[function(){}，function(){}]数组每项都是函数
                // 'B':[],
                // 'C':[],
            },
            addList: function(type, callback) {  //订阅
                if (!this.clientList[type]) {
                    this.clientList[type] = []
                }
                this.clientList[type].push(callback)
            },
            triggers: function(type, msg) { //发布
                var arrCallback = this.clientList[type]; 
                if (!arrCallback || arrCallback.length === 0) {
                    return;
                }
                arrCallback.forEach(function(fn, index) {
                    fn(msg)
                })

            }

        }
        $('.btn1').onclick = function() {
            alert('已订阅户型A');
            saleOffice.addList("A", function(msg) {
                console.log('你关注的"A"如下' + msg)
            })
        }
        $('.btn2').onclick = function() {
            alert('已订阅户型B');
            saleOffice.addList("B", function(msg) {
                console.log('你关注的"B"如下' + msg)
            })
        }
        var arr = [2, 4, 6, 8, 4, 2]
        ajax({
            url: 'http://localhost/test/day26/text2.json',
            type: 'get',
            data: 'user=lai',
            success: function(response) {

                $('.sendb').onclick = function() {
                    saleOffice.triggers("B", response)
                }

            }

        })


        $('.senda').onclick = function() {
            saleOffice.triggers("A", '户型A：建筑面积100平米，单价40000/平，开盘时间2019年11月11日。')
        }
    </script>
</body>

</html>
```
### 单例模式

```js
// 单例模式：保证一个类仅有一个实例，并提供一个访问他的全局访问点

    // 单体模式  （防抖节流） 避免重复生成
    var getSingle =  function(factory){
        var instance;//利用闭包中局部变量能够保存下来的原理
        return function(){
            if(instance){//第二以后次执行时条件成立  后面再执行都是指向同一个对象
                return instance
            }
            return instance = factory()
        }

    };

    var eleLogin=function(){
        var login = document.createElement('div');
        login.className = 'login';
        login.innerHTML = '<h3>用户登录</h3><span>X</span>';
        document.body.appendChild(login);
        return login;
    };
    var eleMask = function(){
        var mask = document.createElement('div');//创建标签  是一个对象
        mask.className = 'mask';
        mask.innerHTML='<p style="height: 100px;background: red;">我是蒙版</p>'
        document.body.appendChild(mask);
        return mask;  //返回对象 (工厂模式）
    };
//每次实例化   getSingle 从新执行
    var elelogin = getSingle(eleLogin);
    var elelogi = getSingle(eleLogin);
    var elemask=  getSingle(eleMask)

document.onclick = function () {
    elelogin()
    elemask()
    elelogi()
}
```