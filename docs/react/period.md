---
sidebarDepth: 2
title : '生命周期'
---
<h1>生命周期钩子函数</h1>

<!-- ### 三大阶段 -->

<!-- <h3>挂载阶段</h3> -->
## 挂载阶段

一. constructor  构造函数
0.5. 一次生命周期触发一次
1. 一般是做State初始化工作
```js
    this.state = {
      msg: "我的天"
    };
```
2. 使用他来做提前的事件处理函数this绑定问题
```js
this.elEvent = this.elEvent.bind(this)

this.elEvent = this.elEvent.bind(this,params)
```
二,render函数
1. 一次生命周期触发多次
2. 主要是用来返回模板的内容
3. 只要 state和props发生变化，这个函数默认情况下回重新执行
4. 如果调用了this.forceUpdate(),那么render就一定会重新执行 
```js
this.forceUpdate()
```
三，static getDerivedStateFromProps(props,state) (类似vue中的计算属性)
1. 触发在挂载之前和render之前，挂载和更新阶段都会触发这一步
2. 必须返回一个对象{}或者null，如果返回对象的话，会和state合并成一份新的state，如果是null，这不做处理
```js
class Hello extends React.Component{
  state = {
    msg: 'hello'
  }
  static getDerivePropsFromProps(props,state){
    return {
      newMsg: msg+'hello'//调用方法this.state.newMsg
    }
  }
}
```
四，componentDidMount(){}挂载完成阶段
1. 可以做axios 请求
2. 可以得到真实的dom对象 this.refs.XXX
<!-- <h2>更新阶段</h2> -->
## 更新阶段
一，static getDeriveStateFromProps()
二，shouldComponentUpdate(){}:是否更新

1. 可以用来优化新能，通过判断条件，比较繁琐只能针对部分，可以参考pureComponent
2. 必须提供返回值，返回值是boolean类型
```js
shouldComponentUpdate(nextProps,NextState){
  if(){
    return true|false
  }
}
```
三，getSnapshotBeforeUpdate(prevProps.prevState){} 类似更新之前
1. 必须有一个返回值，返回值内容会给到componentDidUpdate的第三个参数
```js
getSnapshotBeforeUpdate(prevProps,prevState){
  return 123
}
```
四，componentDidUpdate(prevProps,prevState,snapshot){}
1. 更新完成  并且获得真实dom 
```js
componentDidUpdate(prevProps,prevState,snapshot){
  //snapshot是更新之前传下来的值
  console.log(snapshot) // 123
}
```
<!-- <h2>销毁阶段</h2> -->
## 销毁阶段
一，componentWillUnmount(){} 

1. 做一些清理工作， 比如清理计时器






<style>
h3{
  font-size:18px;
}
.theme-default-content{
  font-size:18px;
}
</style>