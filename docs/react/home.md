---
title: react基础
---
## 生命周期钩子函数

<p>生命周期三大阶段</p>

### 挂载阶段

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
三， static getDerivedStateFromProps(props,state) (类似vue中的计算属性)
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
### 更新阶段
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
### 销毁阶段
一，componentWillUnmount(){} 

1. 做一些清理工作， 比如清理计时器


## this指向总结

#### react中定义的事件this指向默认是undefined 因为指向的事件是自定义的属性，只能其他方法通过改变this指向

### 当事件 不传递参数时

1. 通过.bind()改变this指向 事件本身
```js
//直接表达式的方式，这会导致父组件和子组件render从新更新，消耗性能
this.handleClick.bind(this)  
```
2. 在构造函数里使用.bind(this)
```js
//在构造函数使用，可以节省性能，因为父子组件用的是同一个事件，state/props没有变化就不会更新render
  constructor{
    this.handleClick = this.handleClick.bind(this)
  }
  ```
  3. 使用箭头函数
  ```js
  ()=>{this.handleClick()}//箭头函数指向是指向上下文，没有才指向window
  ```
  4. 使用了public class filed 新语法可以将函数携程箭头函数的形式
 ```js
 <button onClick=(this.handleClick)></button>
 handleClick = ()=>{}
 ```
 ### 传递参数时
 ```js
 //第一种方法bind传参
 this.handleClick = this.handleClick.bind(this,parma)
//箭头函数传参
 (event)=>{this.handleClick(parma,event)}
  handleClick(parma,event)=>{}
  ```

## react-表单

### 受控组件

1. 表单元素value值完全由value值控制，那么这个组件叫受控组件。
2. radio是通过checked来控制的， checkbox也是通过checked赖控制的

### 非受控组件



<style>
h3{
  font-size:18px;
}
.theme-default-content{
  font-size:18px;
}
</style>