---
title : '路由'
---

## vue路由

### 路由的搭建

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({

    routes: [
      {
        routes:[
    {
      path:'/',
      component: Index,
      children:[//二级路由
        {
          path: 'share',
          component: Share
        },
        {
          path: 'show',
          component: Show,
          children:[ //三级路由 需要用<router-view/>渲染
            {
              path: 'hello'
              component: Hello
            }
          ]
        }
      ]
    },
    {
      path: '/homes',
      component: Home
    }
      }
    ]

})
```
### 路由跳转

#### 组件跳转
```js
   <li >
        <router-link to="home">跳转到登录页面 </router-link>   
     </li>
```
#### 编程式导航

1. *this.$router.push({ path:’/user’})* 

```js
// helloWorld.vue
<template>
.....
<li @click="change">验证路由传参</li>
</template>

<script>
export default {
  data () {
    return {
      id:43,  //需要传递的参数
    }
  },
  methods:{
    change(){
      this.$router.push({  //核心语句
        path:'/select',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
          id:this.id ,  
        }
      })
    }
  }
}
</script>

##################################################
// select.vue

<template>
  <select>
          <option value="1" selected="selected">成都</option>
          <option value="2">北京</option>
      </select>
</template>

<script>
    export default{
        data(){
            return{
                id:'',
            }
        },
        created(){  //生命周期里接收参数
            this.id = this.$route.query.id,  //接受参数关键代码
            console.log(this.id)   
        }
    }
</script>

```
2. *this.$router.replace{path：‘/home’ }*