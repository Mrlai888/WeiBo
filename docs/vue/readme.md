---
title: "vue基础"
---
## vue基础

### <router-view />
```js
routes:[
    {
      path:'/',
      component: Index,
      children:[
        {
          path: 'share',
          component: Share
        },
        {
          path: 'show',
          component: Show
        }
      ]
    },
    {
      path: '/homes',
      component: Home
    }
  ]

#################################
// index.vue
      <div class="pageto">
        <ul>
          <li><router-link to="/homes">社区</router-link></li>
          <li><router-link to="/share">用户</router-link></li>
          <li><router-link to="/show">特殊用户</router-link></li>
        </ul>
    </div>
    <div>哈哈</div>
    <router-view></router-view>//点击share和show 页面将会渲染到这里


```

### 全局守卫/路由独享

```js

Vue.use(VueRouter)

const router = new VueRouter({
  // model: history
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/films/:filmsId',
      component: Films
    },
    {
      path: '/login',
      component: login,
      beforeEnter: (to, from, next) => {
        console.log('路由独享')
        next()
      }
    },
    {
      path: '/money',
      component: money,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/card',
      component: Card,
      meta: {
        needLogin: true
      }
    },
    {
      path: '*',
      component: Page404
      // redirect: '/film/nowPlaying'
    }
  ]
})
// 全局守卫
router.beforeEach((to, form, next) => {
  console.log(to) // 要去的路由对象
  if (to.meta.needLogin) {
    if (window.isLogin) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
    }
  } else {
    next()
  }
  next()
})
router.beforeResolve((to, from, next) => {
  next()
})
router.afterEach((to, from) => {
})
export default router
```
### 组件守卫

```js
  // 组件内守卫
  beforeRouteEnter (to, from, next) {
    console.log('进入')
  },
  beforeRouterUpdate (to, from, next) {
    console.log('更新')
  },
  beforeRouterLeave (to, from, next) {
    console.log('离开')
  }
  ```

### 组件传值

#### 父子组件传值

```js
// parent.vue
<template>
 <children v-bind:user='user' />
</template>
<script>
export default {
  data() {
    return {
      user:[1,2,3,4,5]
    }
  },
};
</script>
<style lang="scss">

</style>

################################

// children.vue
<template>
</template>
<script>
import children from './children'
export default {
  props:{
    user:{
      type:Array,
      required:true
    }
  }
  data() {
    return {
    }
  },
 
};
</script>
<style lang="scss">

</style>
```

#### 子父组件

```js
// parent.vue
<template>
 <children @changeData='fn1' />
</template>
<script>
import children from './children'
export default {
  data() {
    return {
      data:''//good
    }
  },
  methods:{
    fn1(e){
      this.data=e
    }
  }
};
</script>

################################

// children.vue
<template>
<button @click='upData'/>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods:{
    upData(){
      this.$emit('changeData','good')
    }
  }
};
</script>
```
#### 中央事件总线（eventBus)
```js
首先创建一个evenBus.js
// eventBus.js
import Vue from 'vue'
export default new Vue()
//新建vue实例

###########################

// 需要发布值得组件上引入eventbus
// a.vue
<template>
</template>
<script>
import eventBus from './eventBus.js'
export default {
  data() {
    return {
    }
  },
  methods:{
    eventBus.$emit('base','中央事件总线')
  }
};
</script>

##############################

// 监听组件接受
// b.vue
<template>
</template>
<script>
import eventBus from './eventBus.js'
export default {
  data() {
    return {
      dataBase:''//中央事件总线
    }
  },
  methods:{
    eventBus.$on('base',(res)=>{
      this.dataBase=res
    })
  }
};
</script>
```
### provide/inject

```js
// A.vue
export default {
  provide: {
    name: '浪里行舟'
  }
}

###########################

// B.vue
export default {
  inject: ['name'],
  mounted () {
    console.log(this.name);  // 浪里行舟
  }
}

```
### $ref
只适用于父子组件

```js
// children.vue
<template></template>
export default {
  data () {
    return {
      title: 'ref传值'
    }
  },
  methods: {
    sayHello () {
      window.alert('Hello');
    }
  }
}
######################
// parent.vue
<template>
<Children ref='get'></Children>
</template>
<script>
import Children from './children'
export default {
  data () {
    return {
    }
  },
mounted(){
  const getChildren=this.$refs.get//获取children组件实例

  console.log(getChildren.title)//通过实例获取children的data和方法
  getChildren.sayHello()
}
}
</script>

```
### 总结

1. 父子组件通信
props， provide/inject ， vuex ，ref，$emit/$on

2. 兄弟组件

父组件中转，eventBus,vuex

3. 跨级

Provide/inject, eventBus, vuex

