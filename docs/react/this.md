---
title: react this指向总结
---
## this指向问题

#### react中定义的事件this指向默认是undefined 因为指向的事件是自定义的属性，只能其他方法通过改变this指向

一， 当事件 不传递参数时

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
 二，传递参数时
 ```js
 (event)=>{this.handleClick(parma,event)}
 this.handleClick = this.handleClick.bind(this,parma)
  handleClick = (event)=>{}
  ```