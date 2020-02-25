---
title : '生命周期'
---
## vue生命周期

### 创建

beforeCerate: 实组件刚创建，元素DOM和数据还未渲染

created: 数据data已经初始化完成，方法也已经可以调用，但是DOM未渲染，（可以在这这一步做ajax异步请求）

### 挂载

beforeMount: 数据初始化完成

mounted:真实dom 渲染完成，（可以使用$refs获取dom)

### 更新

beforeUpdate: 页面数据发生改变这个函数会触发，但是页面数据还是之前的数据

updated: 页面数据发生改变这个函数会触发,数据更新完毕，页面渲染的是更新后的数据

### 销毁

beforeDestroy:销毁之前执行

destroyed: 销毁 （可以在这一步做清计时器，全局注册的滚动事件）
```js
// 物理返回键
 methods: {
    goBack () {
      this.$router.replace({ path: '/' })
    // replace替换原路由，作用是避免回退死循环
    }
  },
  mounted () {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.goBack, false)
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.goBack, false)
  }
}
```