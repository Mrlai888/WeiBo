---
title: 'vue框架学习'
---
# 一、Vue 前端框架学习

## 1、Vue 基础理解使用

> 2. 使用 Vue 构建 Hello World 案例
>
> ```html
> <!-- 开发环境版本，包含了有帮助的命令行警告 -->
> <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
> ```
>
> ```html
> <!-- 生产环境版本，优化了尺寸和速度 -->
> <script src="https://cdn.jsdelivr.net/npm/vue"></script>
> ```
>
> ```html
> <!DOCTYPE html>
> <html lang="en">
> 
> <head>
>     <meta charset="UTF-8">
>     <meta http-equiv="X-UA-Compatible" content="IE=edge">
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
>     <title>vueStudy</title>
> </head>
> 
> <body>
>     <div id='app'>
>          <!--胡子语法-->
>         <span>{{msg}}</span>
>         <button @click='changeMsg'>change</button>
>     </div>
>     <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
>     <script>
>         var app = new Vue({
>             el: '#app',
>             data() {
>                 return {
>                     msg: 'hello word',
>                 };
>             },
>             methods: {
>                 changeMsg() {
>                     this.msg = '你好'
>                 },
>             },
>         })
>     </script>
> </body>
> </html>
> ```
>
> - Vue 是如何引入到页面中的？
>   - 在 html 中导包。
>   - 在 JavaScript 中用包，其本质就是：构造函数传入一个参数，实例化出来一个对象。
> - Vue 是如何和 DOM 结构绑定的？
>   - 首先我们在传入的参数中我们看到了一个关键性的属性，el 属性。
>   - `el:'#app'`，el 这个属性就是一个选择器，关联 html 中的一个 DOM 节点，然后我们的 vue 实例化出来的对象就是在操作这个 DOM 里面的内容。
>   - el 属性可以使用：id、class、tag 选择器，推荐用 id 选择器。



## 二、单文件组件（vue框架里扩展名为 .vue的组件）

在很多 Vue 项目中，我们使用 `Vue.component` 来定义全局组件，紧接着用 `new Vue({ el: '#container '})` 在每个页面内指定一个容器元素。

这种方式在很多中小规模的项目中运作的很好，在这些项目里 JavaScript 只被用来加强特定的视图。但当在更复杂的项目中，或者你的前端完全由 JavaScript 驱动的时候，下面这些缺点将变得非常明显：

- **全局定义 (Global definitions)** 强制要求每个 component 中的命名不得重复
- **字符串模板 (String templates)** 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 `\`
- **不支持 CSS (No CSS support)** 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
- **没有构建步骤 (No build step)** 限制只能使用 HTML 和 ES5 JavaScript，而不能使用预处理器，如 Pug (formerly Jade) 和 Babel

文件扩展名为 `.vue` 的 **single-file components (单文件组件)** 为以上所有问题提供了解决方法，并且还可以使用 webpack 构建

## 1、Vue模板语法

> 1. 插值表达式
>
> **插值表达式：**是vue框架提供的一种在HTML模板中绑定数据的方式，使用`{{变量名}}`方式绑定Vue实例中data中的数据变量，会将绑定的数据实时的在视图中显示出来。
>
> 插值表达式的写法支持使用：
>
> - 变量名
> - 部分JavaScript表达式
>   - 注：`{{  }}`括起来的区域，就是一个就是js语法区域，在里面可以写部份的js语法。不能写 var a = 10;分支语句;循环语句
> - 三元运算符
> - 方法调用（方法必须需要先声明）
> - ...
>
> ```html
> <template>
>     <div >
>         <!-- 直接使用变量名 -->
>         <h5>{{name}}</h5>
>         <!-- 运算 -->
>         <h5>{{name + '--好的'}}</h5>
>         <h5>{{ 1 + 1 }}</h5>
>         <!-- 使用函数 -->
>         <h5>{{title.substr(0,6)}}</h5>
>         <!-- 三目运算 -->
>         <h5>{{ age > 18 ? '成年' : '未成年'}}</h5>
>     </div>
> </template>
> 
> <script>
> export default {
>     // name:'demo',
>     data() {
>         return {
>             title: "我是一个标题，你们看到没有",
>             name: "张三",
>             age: 20,
>         };
>     },
> };
> </script>
> <style lang="scss" scoped>
> </style>
> 
> ```



# 三、常用指令

**问1：什么是指令？**

- [x] 指令的本质就是标签中的vue自定义属性
- [x] 指令格式以“v-”开始，例如: v-text、v-html等

详见官网对指令的说明：https://cn.vuejs.org/v2/api/#%E6%8C%87%E4%BB%A4

**问2：指令有什么作用？**

当表达式的值改变时，将其产生的连带影响，响应式地作用于DOM。（简化操作）

v-text指令与v-html指令【相当于innertHTML和innerText】

## 1、数据绑定指令

> 1. v-text	填充纯文本
>
> - 相比插值表达式更加简洁
>
> - 不存在插值表达式的闪动问题
>
> - v-text：https://cn.vuejs.org/v2/api/#v-text
>
> 

> 2. v-html 	填充HTML片段
>
> - 存在安全问题
> - 本网站内部数据可以使用，来自第三方的数据不可使用
> - v-html：https://cn.vuejs.org/v2/api/#v-html
>
> ```html
> <template>
>     <div>
>         <!-- 插值表达式形式 -->
>         <div>{{str1}}</div>
>         <!-- 插值表达式此时与v-text是等效的 -->
>         <div v-text='str2'></div>
>         <div v-html='str1'></div>
>     </div>
> </template>
> <script>
> export default {
>     // name:'demo',
>     data() {
>         return {
>             str1: '你好，中国',
>             str2: '<a href="http://www.baidu.com">百度</a>'
>         };
>     },
> };
> </script>
> <style lang="scss" scoped>
> </style>
> ```

> 3. v-pre	填充原始信息
>
> - 跳过表达式的编译过程，显示原始信息
>
> ```html
> <template>
>     <div >
>        <span v-pre>{{ this will not be compiled }}</span>
>        <span v-pre>{{ str1 }}</span>
>     </div>
> </template>
> <script>
> export default {
>     // name:'demo',
>     data() {
>         return {
>             str1: '你好，中国',
>         };
>     },
> };
> </script>
> <style lang="scss" scoped>
> </style>
> ```

## 2、v-once

> **作用：**只渲染元素和组件**一次**，之后元素和组件将失去**响应式（数据层面）**功能
>
> **Q & A：**如何理解响应式？
>
> - 布局响应式：随着终端设备的屏幕尺寸的变化而改变布局
> - 数据响应式：数据变化后页面随之变化，页面中的数据变化代码中的数据也跟着变化（双向数据绑定）
>
> **示例：**
>
> ```html
> <template>
>     <div>
> 	<h3>{{message}}</h3>
> 	<!-- 动态修改message值，此绑定将不会发生改变 -->
> 	<div v-once>{{message}}</div>
>     <button @click="changeMessage">change</button>
>     </div>
> </template>
> <script>
> export default {
>     // name:'demo',
>     data() {
>         return {
>             message: '你好，世界',
>         };
>     },
>     methods:{
>         changeMessage(){
>             this.message = 'hello, world'
>         }
>     }
> };
> </script>
> <style lang="scss" scoped>
> </style>
> ```



## 3、v-bind

> **作用：**动态地绑定一个或多个`attribute`【组件内：**一次声明，多次使用**】
>
> 场景：复用某个数据的时候会使用。例如：飞猪官网
>
> ```html
> <!-- v-bind绑定href属性值 -->
> <a v-bind:href='url' v-bind:target='type'>跳转</a>
> 
> <!-- v-bind绑定href属性值（简写形式） -->
> <a :href='url' :target='type'>跳转</a>
> ```
>
> **示例代码**
>
> ```html
> <template>
> <div>
> <a :href="url" :target="type" :alt="alt">{{alt}}</a>
> <a :href="url">{{alt}}</a>
> </div>
> </template>
> <script>
> export default {
>  // name:'demo',
>  data() {
>      return {
>          url: 'https://www.baidu.com',
>          type: '_blank',
>          alt: '百度官网'
>      };
>  },
> };
> </script>
> <style lang="scss" scoped>
> </style>
> ```



## 4、v-on（重点）

### 4.1、基本使用

> 1. **作用：**绑定事件监听器（事件绑定）
>
> **示例：**
>
> ```html
> <!-- 常规写法 -->
> <button v-on:click="num++"></button>
> <!-- 缩写 -->
> <button @click="num++"></button>
> 
> <!-- 事件处理函数调用：直接写函数名 -->
> <button @click="say"></button>
> ```
>
> 如果事件处理函数为自定义函数，则需要先进行定义，定义的方式如下：
>
> ```javascript
> ...
> data: {
>     ...
> },
> methods: {
>     functionName: function(arg1,arg2,arg3,...){
>         // something to do
>     },
>     ....
> }
> ```
>
> ```vue
> <template>
> <div>
> <!-- 常规写法 -->
> <button v-on:click="num++">常规写法v-on:</button>
> <!-- 缩写 -->
> <button @click="num++">缩写@click</button>
> 
> <!-- 事件处理函数调用：直接写函数名 -->
> <button @click="subtract">直接写函数名</button>
> 
> <div>{{`num:${num}`}}</div>
> </div>
> </template>
> <script>
> export default {
>     // name:'demo',
>     data() {
>         return {
>             num:1
>         };
>     },
>     methods:{
>         subtract(){
>             this.num--
>         }
>     }
> };
> </script>
> <style lang="scss" scoped>
> </style>
> ```
>
> 

> 2. **事件处理函数传参**
>
> ```html
> <!-- 事件处理函数调用：直接写函数名 -->
> <button @click="say"></button>
> 
> <!-- 事件处理函数调用：常规调用 -->
> <button @click="say('hi',$event)"></button>
> ```
>
> 在不传递自定义参数的时候，上述两种用法均可以使用；但是如果需要传递自定义参数的话，则需要使用第2种方式。
>
> 事件对象的传递与接收注意点
>
> - 如果事件直接使用函数名并且不写小括号，那么默认会将事件对象作为唯一参数进行传递
> - 如果使用常规的自定义函数调用（只要写了小括号），那么如果需要使用事件对象则必须作为最后一个参数进行传递，且事件对象的名称必须是“$event”
>
> **示例代码**
>
> ```html
> <template>
>     <div >
>         <div id="big" @click="say('大娃',$event)"></div>
>         <div id="mid" @click="say('二娃',$event)"></div>
>          <div id="sma" @click="say('三娃',$event)"></div>
>         <div>{{currentName}}</div>
>     </div>
> </template>
> <script>
> export default {
>     // name:'demo',
>     data() {
>         return {
>             currentName:''
>         };
>     },
>     methods:{
>         say: function(name,event){
>                this.currentName = '你点了' + name;
>             	console.log(event)
>             }
>     }
> };
> </script>
> <style lang="scss" scoped>
>     #big {
>         width: 200px;
>         height: 50px;
>         background-color: red;
> 
>     }
>      #mid {
>         width: 200px;
>         height: 50px;
>         background-color: green;
>     }
>        #sma {
>         width: 200px;
>         height: 50px;
>         background-color: pink;
>     }
> </style>
> ```



### 4.2、事件修饰符

> 含义：用来处理事件的特定行为
>
> 使用示例：
>
> ```html
> <!-- 停止冒泡 --><button @click.stop="doThis"></button><!-- 阻止默认行为 --><button @click.prevent="doThis"></button><!--  串联修饰符 --><button @click.stop.prevent="doThis"></button>
> ```
>
> 示例
>
> ```vue
> <template>    <div >     <div id="big" @click.stop="say('大娃',$event)">         <div id="mid" @click.stop="say('二娃',$event)">             <div id="sma" @click.stop="say('三娃',$event)"></div>         </div>     </div>     <div>{{currentName}}</div> </div></template><script>export default { // name:'demo', data() {     return {         currentName:'',     }; }, methods:{     say(name,event){            this.currentName = '你点了' + name;            console.log(event)         } }};</script><style lang="scss" scoped>    #big {     width: 300px;     height: 300px;     background-color: red; } #mid {     width: 200px;     height: 200px;     background-color: green; } #sma {     width: 100px;     height: 100px;     background-color: pink; }</style>
> ```
>
> 
>
> 更多事件修饰符请参考官方文档：https://cn.vuejs.org/v2/api/#v-on



### 4.3、按键修饰符

> 在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符。
>
> ```html
> <!-- 只有在 `key` 是 `Enter` 回车键的时候调用 --><input v-on:keyup.enter="submit"><!-- 只有在 `key` 是 `Delete` 回车键的时候调用 --><input v-on:keyup.delete="handle">
> ```
>
> 更多按键修饰符请参考官方文档：[https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6](https://cn.vuejs.org/v2/guide/events.html#按键修饰符)



## 5、循环分支指令

### 5.1、循环指令

> **作用：**根据一组数组或对象的选项列表进行渲染。
>
> **指令：**v-for
>
> - 数组遍历使用示例：
>
> ```html
> <template>       <div >        <ul>            <li v-for="(item, index) in fruits" :key="index">{{item}}</li>        </ul>    </div></template><script>export default {    // name:'demo',    data() {        return {            fruits: ['apple','pear','banana','orange']        };    },    methods:{    }};</script><style lang="scss" scoped></style>
> ```
>
> - 细节：key的作用，提高性能，不影响显示效果（`如果没有id，可以考虑使用索引替代`）
>
> ```html
> <ul>    <li :key='item.id' v-for='(item,index) in fruits'>{{item}}</li></ul>
> ```
>
> - 对象遍历使用示例：
>
> ```html
> <template>       <div >        <ul>            <li v-for="(item, index) in obj" :key="index">{{item}}</li>        </ul>    </div></template><script>export default {    // name:'demo',    data() {        return {        obj: {		username: 'zhangsan',		age: 28,		gender: 'male'	}        };    },    methods:{    }};</script><style lang="scss" scoped></style>
> ```



### 6、分支(条件渲染)指令

> 1. **作用：**根据表达式的布尔值(true/false)进行判断是否渲染该元素
>
> - v-if
>
> - v-else
>
> - v-else-if
>
>   上述三个指令是分支中最常见的。根据需求，v-if可以单独使用，也可以配合v-else一起使用，也可以配合v-else-if和v-else一起使用。
>
> - v-show
>
>   v-show是根据表达式之真假值，切换元素的 `display` CSS属性。

> 2. 使用示例：
>
> ```html
> <template>    <div ">    <div v-if="score >= 90">优秀</div><div v-else-if="score >= 80 && score < 90">良好</div><div v-else-if="score >= 70 && score < 80">一般</div><div v-else>不及格</div><!-- v-show --><div v-show='flag'>测试v-show</div>    </div></template><script>export default {    // name:'demo',    data() {        return {        score: 60,	    flag:false        };    },    methods:{    }};</script><style lang="scss" scoped></style>
> ```

> 3. 思考：v-if系列与v-show的区别是什么？
>
>    v-if：控制元素是否渲染
>
>    v-show：控制元素是否显示（已经渲染，display:none;） 更多的渲染开销
>
> 
>
> 补充：v-if系列指令、v-show指令可以与v-for指令结合起来使用（循环+分支）。例如：
>
> ```html
> <ul>    <li v-for='(value,key,index) in obj' v-show='value==25'>{{v}}</li></ul>
> ```





## 7、样式绑定

> ### 7.1、class样式绑定
>
> - 对象语法（`用于控制开关切换`）
>
> ```html
> <template>    <div >        <div :class="{active: isActive}">class样式</div>    </div></template><script>export default {    // name:'demo',    data() {        return {        isActive:true        };    },    methods:{    }};</script><style lang="scss" scoped> .active {	color: red;}</style>
> ```
>
> 
>
> - 常用写法
>
> ```html
> <template>    <div>        <div :class="activeClass">数组写法</div>    </div></template><script>export default {    // name:'demo',    data() {        return {            activeClass:'active'        };    },    methods:{    }};</script><style lang="scss" scoped> .active {	color: red;}</style>
> ```



> ### 7.2、style样式处理
>
> - 对象语法
>
> ```html
> <template>    <div >        <div :style="{color: redColor, fontSize: '20px'}">对象写法</div>    </div></template><script>export default {    // name:'demo',    data() {        return {            redColor: 'red'        };    },    methods:{    }};</script><style lang="scss" scoped></style>
> ```
>
> 
>
> - 数组语法
>
> ```html
> <template>    <div >        <div :style="[color, fontSize]">数组写法</div>    </div></template><script>export default {    // name:'demo',    data() {        return {            color: {                'color':'red'            },            fontSize:{                'font-size':'16px'            }        };    },};</script><style lang="scss" scoped></style>
> ```



## 8、v-model

> **作用:：**表单元素的绑定，实现了**双向数据绑定**，通过表单项可以更改数据。
>
> v-model会忽略所有表单元素的value、checked、selected特性的初始值,而总是将Vue实例的数据作为数据来源，应该在data选项中声明初始值。

> 1. 普通文本框上的使用
>
> ```html
> <template>    <div >    <p>{{message}}</p>    <input type='text' v-model='message'>    <!--    v-model其实是`语法糖`,它是下面这种写法的简写    语法糖：这种语法对语言的功能并没有影响，但是更方便程序员使用    -->    <p>{{msg}}</p>    <input type='text' :value='msg' @input='msg=$event.target.value'/>    </div></template><script>export default {    // name:'demo',    data() {        return {            message:'',            msg:''        };    },};</script><style lang="scss" scoped></style>
> ```

> 2. 多行文本框上的使用
>
> ```html
> <template>   <div >     <p>{{message}}</p>    <textarea v-model="message"></textarea></div></template><script type='text/javascript'>export default {    data() {        return {            message:'',        };    },};</script><style lang="scss" scoped></style>
> ```

> 3. 单个复选框上的使用
>
> ```html
> <template>   <div >    <input type="checkbox" v-model="checked">	</div></template><script type='text/javascript'> export default {    data() {        return {            checked:true        };    },};</script><style lang="scss" scoped></style>
> ```

> 4. 多个复选框上的使用
>
> ```html
> <template>   <div >    <div>{{checkedNames}}</div>    <input type="checkbox" value="html" v-model="checkedNames">    <input type="checkbox" value="css" v-model="checkedNames">    <input type="checkbox" value="js" v-model="checkedNames"></div></template><script type='text/javascript'> export default {    data() {        return {         // 如果数组中有对应的value值，则此checkbox会被选中		checkedNames:[]        };    },};</script><style lang="scss" scoped></style>
> ```
>
> **注意：此种用法需要`input`标签提供`value`属性，并且需要注意属性的大小写要与数组元素的大小写一致**

> 5. 单选按钮上的使用
>
> ```html
> <template>   <div >    男<input type="radio" name="sex" value="男" v-model="sex">	  女<input type="radio" name="sex" value="女" v-model="sex"></div></template><script type='text/javascript'> export default {    data() {        return {         sex: '女'        };    },};</script><style lang="scss" scoped></style>
> ```

> 6. 下拉框上的使用
>
> ```html
> <template><div>    <select v-model="selected">        <option>请选择</option>        <option>HTML</option>        <option>CSS</option>        <option>JS</option>    </select></div></template><script type='text/javascript'> export default {    data() {        return {         selected: 'JS'        };    },};</script><style lang="scss" scoped></style>
> ```

> - 补充说明：修饰符
>
> .number：自动将用户的输入值转为数值类型（如果能转的话）
>
> .trim：自动过滤用户输入的首尾空白字符
>
> 



# 四、Vue的常用特性

## 1、计算属性 - computed

计算属性定义在Vue对象中，通过关键词`computed`属性对象中定义一个个函数，并返回一个值，使用计算属性时和`data`中的数据使用方式一致,**计算属性是基于它们的响应式依赖进行缓存的**。

**示例**

```html
<template><div >    <!--只要 num 还没有发生改变，多次访问 cfn 计算属性会立即返回之前的计算结果-->    <div>{{ cfn }}</div>    <div>{{ cfn }}</div>    <!-- 调用methods中的方法的时候  他每次会重新调用 -->    <div>{{ fn() }}</div>    <div>{{ fn() }}</div></div></template><script type="text/javascript">     export default {        data: {            num: 10,        },        // 方法        methods: {            fn() {                console.log("methods");                return this.num;            },        },        // 计算属性        computed: {            cfn() {                console.log("computed");                return this.num;            },        },    };</script>
```

**注意：**只要依赖的数据源不发生改变，计算属性里的对应方法就只被调用1次，其它时候被调用时则使用缓存。



## 3、监听器 - watch

使用watch来侦听data中数据的变化，watch中的属性一定是data 中已经存在的数据。

**使用场景：**数据变化时执行异步或开销比较大的操作。



**参考代码：**

```html
<template><div>    <p><input type="text" v-model='firstName' placeholder="姓" /></p>    <p><input type="text" v-model='lastName' placeholder="名" /></p>    <p><input type="text" v-model='fullName' placeholder="全名" /></p></div> </template><script type="text/javascript">    export default {        data: {            firstName: '',            lastName: '',            fullName: ''        },        watch: {            firstName: function(val) {                this.fullName = val + ' ' + this.lastName            },            lastName: function(val) {                this.fullName = this.firstName + ' ' + val            }        }    }</script>
```

> 注意点：
>
> - 声明监听器，使用的关键词是`watch`
> - 每个监听器的方法，可以接受2个参数，第一个参数是新的值，第二个参数是之前的值



**注意：**当需要监听一个对象的改变时，普通的watch方法无法监听到对象内部属性的改变，此时就需要deep属性对对象进行**深度监听**。

**使用对象的数据形式改写上述案例参考代码：**

```html
<template><div>    <p><input type="text" v-model='userinfo.firstName' placeholder="姓" /></p>    <p><input type="text" v-model='userinfo.lastName' placeholder="名" /></p>    <p><input type="text" v-model='userinfo.fullName' placeholder="全名" /></p></div> </template><script type="text/javascript">     export default {     data: {            userinfo: {                firstName: '',                lastName: '',                fullName: ''            }        },        watch: {            userinfo: {                // handler是固定的写法                handler(val) {                    this.userinfo.fullName = val.firstName + ' ' + val.lastName                    // 对象支持引用传值                    val.fullName = val.firstName + ' ' + val.lastName                },                deep: true            }        }};</script>
```





## 4、过滤器 - filters（了解）

**作用：**格式化数据，比如将字符串格式化为首字母大写、将日期格式化为指定的格式等。

- 过滤器可以定义成全局过滤器和局部过滤器。
- 过滤器的本质就是一个方法，使用过滤器实际上就相当于方法调用，仅是书写形式上的差异（使用的时候需要用“|”，其也可以被称之为`管道`或`变量/数据修饰符`）

**声明语法：**

```javascript
// 全局过滤器Vue.filter('过滤器名称',function(value[,arg1,arg2...]){	//过滤器业务逻辑	return ....})// 局部过滤器el: '#app',data: {},filters: {    过滤器名称: function(value[,arg1,arg2...]){        return something    },    // ....}
```

> 过滤器的处理函数中的第一个参数**固定**是`绑定的待处理数据`，后续可以根据需要添加自定义参数



**使用语法：**

```html
<!-- 过滤器使用 --><div>{{msg | upper}}</div><!-- 过滤器允许连续使用，“前 → 后”按顺序执行 --><div>{{msg | upper | lower}}</div><!-- 过滤器支持在v-bind中使用 --><div v-bind:id='id | formatId'></div><!-- 过滤器支持传参 --><div>{{msg | mysub(1,2)}}</div>
```

>  提醒：计划在Vue3.0干掉。

**案例**

```html
<template>    <div >        <h4>{{msg | toUpper}}</h4>        <h4>{{msg | toLower}}</h4>    </div> </template><script type="text/javascript">   export default {    data() {        return {        };    },     filters:        // 转字母为小写        toLower: (val) => {           return val.toLowerCase()         },          // 转字母为大写        toUpper(val){        return val.toUpperCase()    	}      }};</script>
```





## 6、生命周期（了解）

每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如需要设置数据监听、编译模板、挂载实例到 DOM，在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，目的是给予用户在一些特定的场景下添加他们自己代码的机会。

Vue生命周期的主要阶段：

- 挂载（初始化相关属性）
  - beforeCreate
    - **注意点**：在此时不能获取data中的数据，也就是说`this.msg`得到的是`undefined`
  - created  (此处可以请求后台数据)
  - beforeMount
  - mounted【页面加载完毕的时候就是此时】
    - **注意点**：默认情况下，在组件的生命周期中只会触发一次
- 更新（元素或组件的变更操作）
  - beforeUpdate
  - updated
    - **注意点**：可以重复触发的
- 销毁（销毁相关属性）
  - beforeDestroy
    - **注意点**：
  - destroyed

> 销毁（手动）使用`this.$destroy()`





# 五、Vue组件

### 1、组件的使用

在HTML模板中，组件以**一个自定义标签的形式存在**，起到占位符的功能。通过Vue.js的声明式渲染后，占位符将会被替换为实际的内容，下面是一个最简单的模块示例：

```html
<template>   <div >    <!-- 使用子组件 -->    <HelloWorld/></div></template><script type='text/javascript'>// 引入的子组件import HelloWorld from '@/components/HelloWorld.vue'; export default {     components:{        //  注册子组件        HelloWorld     },    data() {        return {        };    },};</script><style lang="scss" scoped></style>
```



## 2、组件间传值



### 2.1、父→子传值

- 父组件以属性的形式绑定值到子组件身上
- 子组件通过使用属性props接收
  - props是单向绑定的（只读属性）：当父组件的属性变化时，将传导给子组件，但是反过来不会
  - props属性支持两种常见的写法形式
    - 数组（推荐）
      - 优点：书写简单
      - 缺点：不能设置默认值、数据类型
    - 对象
      - 优点：可以设置数据默认值与数据类型
      - 缺点：写法复杂

**示例代码**

```html
// Parent.vue<template>    <div>        <Child :msg="message"></Child>    </div></template><script>import Child from './Child.vue'export default {    name: 'Parent',    components: {         Child     },    data() {        return {            message:'hello world'        };    },};</script><style lang="scss" scoped></style>// Child.vue<template>    <div>        <div>{{msg}}</div>    </div></template><script>export default {    name: 'Child',        // 数组形式    props:['msg'],    // 对象形式    // props: {    //   msg: String,    //   msg:{    //     type:String,    //     default:'hello'    //   }    // },    data() {        return {                    };    },};</script><style lang="scss" scoped></style>
```



### 2.2、子→父传值

- 子组件模版内容中用`$emit()`定义`自定义事件`，`$emit()`方法有2个参数
  - 第一个参数为自定义的事件名称
  - 第二个参数为需要传递的数据（可选）

- 父组件模板内容中的子组件占位标签上用v-on（或@）绑定子组件定义的自定义事件名，监听子组件的事件，实现通信

**示例代码：每点击子组件按钮给父组件字体加9像素**

```html
// Parent.vue<template>    <div>        <Child @addFontSize="add"></Child>        <p :style="{fontSize:fontsize+'px',color:'red'}">{{msg}}</p>    </div></template><script>import Child from './Child.vue'export default {    name: 'Parent',    components: {         Child     },    data() {        return {            msg:'hello world',            fontsize:16        };    },    methods:{        add(value){            this.fontsize += value        }    }};</script><style lang="scss" scoped></style>// Child.vue<template>    <div>        <button @click="addSize">点我给父组件字体加9px</button>    </div></template><script>export default {    name: 'Child',        // 数组形式    data() {        return {                    };    },    methods: {        addSize() {            this.$emit('addFontSize',9)        },    },};</script><style lang="scss" scoped></style>
```



### 2.3、EventBus

> EventBus又被称之为中央事件总线

在Vue中通过单独的`事件中心`来管理非`父子关系`组件（兄弟）间的通信：

**核心步骤**

- 建立事件中心

  - ```javascript
    // main.jsimport Vue from 'vue';import App from './App.vue';import '../config/element';Vue.prototype.$eventBus = new Vue()new Vue({  render: h => h(App)}).$mount('#app')
    ```

- 传递数据

  - ```javascript
    this.$eventBus.$emit('自定义事件名',传递的数据)
    ```

- 接收数据

  - ```javascript
    this.$eventBus.$on('自定义事件名'[,callback])
    ```

- 销毁事件中心

  - ```javascript
    this.$eventBus.$off('自定义事件名')
    ```

示例

```html
// Child.vue<template>    <div>        <p>{{msg}}</p>    </div></template><script>export default {    name: 'Child',    data() {        return {            msg:'你好'        };    },    mounted() {        this.$eventBus.$on('eventFn',(val)=>{            this.msg = val        })    },    destroyed(){        this.$eventBus.$off('eventFn')    }};</script><style lang="scss" scoped></style>// Child1.vue<template>    <div>        <button @click="byValue">点我传值给兄弟Child</button>    </div></template><script>export default {    name: 'Child1',    data() {        return {                    };    },    methods: {        byValue(){            this.$eventBus.$emit('eventFn','hello')        }    },};</script><style lang="scss" scoped></style>// Parent.vue<template>    <div>        <Child></Child>        <Child1></Child1>    </div></template><script>import Child from './Child.vue';import Child1 from './Child1.vue'export default {    name: 'Parent',    components: {         Child,        Child1     },    data() {        return {        };    },};</script><style lang="scss" scoped></style>
```



### 2.4、ref（子→父）

`ref`属性被用来给元素或子组件注册引用信息，引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用`ref`属性，则引用指向的就是 DOM 元素；如果`ref`属性用在子组件上，引用就指向子组件**实例**。

- `ref`放在标签上，拿到的是原生节点。`ref`放在组件上 拿到的是组件实例
- 原理：在父组件中通过`ref`属性（会被注册到父组件的`$refs`对象上）拿到组件/DOM对象，从而得到组件/DOM中的**所有的信息**，也包括值

```html
<template>  <div><!-- 普通DOM --><p ref="p">hello</p><!-- 子组件 --><child-comp ref="child"></child-comp>           </div></template><script>export default {    data() {        return {        };    },      mounted: function(){        console.log(this.$refs.p);        console.log(this.$refs.child);        // this.$refs.component.msg = '123' // 修改值    }};</script><style lang="scss" scoped></style>
```

> 注意：
>
> `ref`属性这种获取子元素/组件的方式虽然写法简单，容易上手，但是其由于权限过于开放，不推荐使用，有安全问题。（不仅可以获取值，还可以获取其他所有的元素/组件的数据，甚至可以修改这些数据。）



## 3、组件插槽

组件的最大特性就是`重用`，而用好插槽能大大提高组件的可重用能力。

**插槽的作用：**父组件向子组件传递内容。

![父组件向子组件传递内容](https://storage.lynnn.cn/assets/markdown/91147/pictures/2020/08/c5ddf742613c5886ff140e5d381f9ff76a803d8b.jpeg?sign=59bc2dccbbaf747f12c649b7c17d9415&t=5f3a3981)

通俗的来讲，**插槽无非就是在`子组件`中挖个坑，坑里面放什么东西由`父组件`决定。**

插槽类型有：

- 单个（匿名）插槽
- 具名插槽
- 作用域插槽

### 3.1、匿名插槽

> 匿名插槽一般就是使用单个插槽

**示例代码**

```html
// Parent.vue<template>    <div>        <Child>            // 插槽内容            hello        </Child>    </div></template><script>import Child from './Child.vue';export default {    name: 'Parent',    components: {         Child,     },    data() {        return {        };    },};</script><style lang="scss" scoped></style>// Child.vue<template>    <div>        // 匿名插槽        <slot></slot>    </div></template><script>export default {    name: 'Child',    data() {        return {                    };    },};</script><style lang="scss" scoped></style>
```

> 注意：子组件的`slot`标签中允许书写内容，当父组件不往子组件传递内容时，`slot`中的内容才会被展示出来。



### 3.2、具名插槽

`slot` 元素可以用一个特殊的特性 `name` 来进一步配置如何分发内容。多个插槽可以有不同的名字，具名插槽将匹配内容片段中有对应 `slot` 特性的元素。

**`上中下`形式网页布局示例代码**

```html
// Parent.vue<template>    <div>        <Child>            // 插槽内容            <h1 slot="header">这里可能是一个页面标题</h1>                        <p slot="footer">这里有一些联系信息</p>        </Child>    </div></template><script>import Child from './Child.vue';export default {    name: 'Parent',    components: {         Child,     },    data() {        return {        };    },};</script><style lang="scss" scoped></style>// Child.vue<template>    <div>        <slot name = 'header'></slot>         <p>主要内容的一个段落。</p>        <slot name='footer'></slot>    </div></template><script>export default {    name: 'Child',    data() {        return {                    };    },};</script><style lang="scss" scoped></style>
```

> 具名插槽存在的意义就是为了解决在单个页面中同时使用多个插槽。



### 3.3、作用域插槽

**应用场景：**父组件对子组件的内容进行加工处理

作用域插槽是一种**特殊类型**的插槽，**作用域插槽会绑定了一套数据，父组件可以拿这些数据来用**，于是，情况就变成了这样：样式父组件说了算，但父组件中内容可以显示子组件插槽绑定的数据。

**示例代码**

```html
// Parent.vue<template>    <div>        <Child>            <p slot-scope="props">                {{props.value}}            </p>        </Child>    </div></template><script>import Child from './Child.vue';export default {    name: 'Parent',    components: {         Child,     },    data() {        return {        };    },};</script><style lang="scss" scoped></style>// Child.vue<template>    <div>        <slot :value='values'></slot>    </div></template><script>export default {    name: 'Child',    data() {        return {            values:1000        };    },};</script><style lang="scss" scoped></style>
```



# 五、前端路由



## 1、Vue Router

网址：https://router.vuejs.org/zh/

### 1.1、介绍

**Vue Router 是 Vue.js 官方的路由管理器**。它和 Vue.js 的核心深度集成，让构建单页面应用变得简单

### 1.2、安装

如果在vue-cli创建项目时没有勾选上`vue-router`选项，此时就需要手动的来安装它（

```shell
npm i -S vue-router
```

### 1.3、Vue Router基本使用

Vue Router的基本使用步骤：

- 引入相关库文件
- VueRouter引入到Vue类中
- **定义路由组件规则**
- 创建路由实例
- 把路由挂载到Vue根实例中
- **添加路由组件渲染容器到对应组件中（占坑）**

```javascript
// router/index.js// 引入相关库文件import Vue from 'vue'import VueRouter from 'vue-router'// VueRouter引入到Vue类中Vue.use(VueRouter)// 组件的引入import Home from '../views/Home.vue';import User from '../views/user/index.vue';import Login from '../views/login/index.vue';import Role from '../views/role/index.vue'// 定义路由规则const routes = const routes = [  {    path: '/',    name: 'Login',    component: Login,  },  {    path: '/login',    name: 'Login',    component: Login  },  {    path: '/home',    name: 'Home',    component: Home,    redirect:'/home/user',    children: [      {        path: 'user',        name: 'User',        component: User,      },    ]  },  {    path: '/about',    name: 'About',    // 懒加载简单来说就是延迟加载或按需加载，即在需要的时候的时候进行加载。    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')  },]// 创建路由实例const router = new VueRouter({  routes  // 传递规则的时候，传递的规则的属性名必须是`routes`})// 暴露router让外界使用export default router// main.js // 挂载根实例（main.js）// 记得要通过 router 配置参数注入路由，// 从而让整个应用都有路由功能import Vue from 'vue'import App from './App.vue'import router from './router'import '../config/element'Vue.config.productionTip = falsenew Vue({  router,  render: h => h(App)}).$mount('#app')// app.vue<!-- html，添加路由组件渲染容器 --><templete><div id="app">	<router-view></router-view></div></templete>
```



### 1.4、导航方式

在页面中，导航实现有2种方式：

<!-- - 声明式导航：通过点击链接实现的导航方式，例如HTML中的“<a>”标签，Vue中的“<router-link>”所实现的。 -->
- 编程式导航：通过调用JavaScript形式API实现的导航方式，例如location.href实现的跳转效果

#### 1.4.1、声明式导航

它就是先在页面中定义好跳转的路由规则，vueRouter中通过 router-link组件来完成

```html
<!-- <router-link to="path">xxx</router-link> -->
	to 要跳转到的路由规则  string|object	to="users"	:to="{path:'path'}"
```



#### 1.4.2、编程式导航

简单来说，编程式导航就是通过`JavaScript`来实现路由跳转

```javascript
// this.$router.push("/login");this.$router.push({ path:"/login" });this.$router.push({ path:"/login",query:{username:"jack"} });this.$router.push({ name:'user' , params: {id:123} });this.$router.go( n );//n为数字  负数为回退
```



### 1.5、嵌套路由

嵌套路由最关键在于理解子级路由的概念：

比如我们有一个`/users`的路由，那么`/users`下面还可以添加子级路由，如:`/users/index`、`/users/add`等等，这样的路由情形称之为嵌套路由。

>  核心思想：在**父路由组件**的模板内容中添加子路由链接和子路由**填充位（占坑）**，同时在路由规则处为父路由配置**children属性**指定子路由规则：

```javascript
routes: [  {       path: "/user",       component: User, 	//这个不能丢      // 通过children属性为/user添加子路由规则      children:[          { path: "index", component: Index },          { path: "add", component: Add },      ]  }]
```

```html
<!-- 需要在 User组件中定义一个router-view 用于嵌套路由的渲染显示 --><router-view></router-view>
```

提个醒：后续也可直接写死地址来实现`嵌套路由`的地址效果，例如有以下代码：

```javascript
// { path: "/film", redirect: "/nowplaying", component: Film },{ path: "/nowplaying", component: NowPlaying },{ path: "/comingsoon", component: ComingSoon },
```

这三个路由也可以实现带有`film`的前缀，给人一种使用了父子路由的幻象。



### 1.6、动态路由匹配

所谓动态路由就是路由规则中有部分规则是动态变化的，不是固定的值，需要去匹配取出数据（即`路由参数`）。

```javascript
// 传递参数idvar router = new VueRouter({    // routes是路由规则数组     routes: [        { path: '/user/:id', component: User },        // 此处的“:”只是在声明的时候写，在使用的时候不需要写“:”    ]})// 组件中获取id值...mounted(){    let id = this.$route.params.id}...
```



**注意：在实际开发的时候会有可能需要传参也可能不需要传参的情况，这个时候需要用到`可选路由参数`点。**

定义可选路由参数的方式很简单，只需要在原有的路由参数声明位置后面加上个`?`即可。例如：

```javascript
// { path: "showdetail/:id?", component: ShowDetail },
```



### 1.7、命名路由（可选）

命名路由：路由别名，顾名思义就是给路由起名字（外号）。

通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。

```javascript
// 路由const router = new VueRouter({  routes: [    {      path: '/user/:id',      name: 'user',      component: User    }  ]})
```

```html
<!-- 声明路由<router-link :to="{ name: 'user', params: { id: 123 }}">User</router-link> -->
```



### 1.8、路由守卫

`导航守卫`就是路由跳转过程中的一些`钩子函数`，这个过程中触发的这些函数能让你操作一些其它事情时，可以进行过滤操作，这就是导航守卫。

- 全局守卫

```javascript
// 全局前置守卫  路由规则文件中定义// 当一个导航触发时,触发前置守卫，// to: Route: 即将要进入的目标 路由对象// from: Route: 当前导航正要离开的路由// next: Function: 一定要调用该next方法，否则路由不向下执行。router.beforeEach((to, from, next) => {  // ...})// 全局后置钩子// 此钩子不会接受 next 函数也不会改变导航本身router.afterEach((to, from) => {  // ...})
```

> - 全局守卫定义在路由规则文件中
> - 参数含义：
>   - to: Route: 即将要进入的目标 路由对象
>   - from: Route: 当前导航正要离开的路由
>   - next: Function: 一定要调用该next方法，否则路由不向下执行（后置全局守卫没有next函数）



- 组件内守卫

```javascript
// 可以在路由组件内直接定义以下路由导航守卫const Foo = {  template: `...`,  beforeRouteEnter (to, from, next) {    // 不能获取组件实例 `this`（这个时候还没有进入到to对应的组件中，所以拿不到this）    // 因为当守卫执行前，组件实例还没被创建  },  beforeRouteUpdate (to, from, next) {    // 在当前路由改变，但是该组件被复用时调用    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。    // 可以访问组件实例 `this`  },  beforeRouteLeave (to, from, next) {    // 导航离开该组件的对应路由时调用    // 可以访问组件实例 `this`  }}
```

> 手动更改地址栏中的路由不会触发`beforeRouteUpdate`和`beforeRouteLeave`钩子函数。

