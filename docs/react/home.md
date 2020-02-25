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

1. 表单元素value值完全由数据控制，数据的变化需要监听onChange事件，只能在事件里修改数据， 那么这个组件叫受控组件。
2. radio是通过checked来控制的， checkbox也是通过checked来控制的

### 非受控组件

1. 表单的值不是通过数据控制，value已经定义好
2. value通过refs获取dom 对象的方式获取  

## react-props

### props 的默认值设置

1. 设置组件的defaultProps属性

```js
// 类组件
class Hello extends React.Component{
  Hello.defaultProps = {
    props1: defaultProps1,
    propsX:defaultPropsX
  }
}
// 函数组件
const Hello = ()=>{
  Hello.defaultProps = {
    props1: defaultProps1,
    propsX:defaultPropsX
  }
}

如果提供了 public class filed 实验语法，可以使用静态属性
class Hello extends React.Component{
  static propTypes = {
    props: defaultProps
  }
}
```

### prop的校验

#### 自 React v15.5 以后，react-propsTypes 已经移入prop-types包中  安装"yarn add prop-types"

```js
import pt from prop-types

// 类数组
class Hello extends React.Component{
  Hello.propTypes = {
    props: pt.String
  }
}

const Hello = ()=>{
  Hello.propTypes = {
    props: pt.Number
  }
}

===如果开启了es6的public class filed 新语法可以设置静态属性 static
class Hello extends react.Component{
  static propTypes = {
    props: pt.Boolean
  }
}
```
### 组件通信context的两种使用方式

#### context使用
 0. 用于父子、祖孙组件通信 类似vue的provide与inject
 1. 创建context对象， React.createContext()
 2. let myContext = React.createContext()
 3. context 对象有两个组件，一个叫供应商（Provider） 一个是消费者（Consumer）

 #### 第一种使用方式
 使用Provider组件包裹住提供数据的组件，并设置value属性传递一个对象，属性值就是传递的数据
 用Consumer组件包裹消组件，组件开始标签与闭合标签之间是一个函数，返回值是消费者组件的内容，函数接受一个参数是供应商provider传下来的值

 #### 消费者（Consumer）的第二种使用种方法
 给消费者设置一个contextType静态属性，属性值是一个context对象/ 这是消费者就会多出一个context属性这个属性可以直接拿到数据

```js
import React,{Component} from 'react'
import ReactDom from 'react-dom'

const myContext = React.createContext()
const { Provider , Consumer } = myContext

class App extends React.Component{

  state = {
    color: "yellow",
    fontSize: 24
  }
  render() {
    return(
      <Provider value = {{
        color:this.state.color,
        fontSize: this.state.color
      }}>
        <h1>App</h1>
        <button onClick = {()=>{
          this.handleClick()
        }}>点我改绿色</button>

        <One></One>
      </Provider>
    )
  }
  handleClick(){
    this.setState({
      color: "green",
      fontSize: 34
    })
  }
}


class One extends Component{
  
  render(){
    return(
      <div>
        <h1>one</h1>
        <br />
        <Two></Two>
      </div>
    )
  }
}

// 第一种方法
class Two extends Component{
  render(){
    return(
      <Consumer>
        {
          // data 是provider传下来的数据
          (data)=>{
            return(
              <div>
                <h2 style={{color:data.color,fontSize:data.fontSize+'px'}}>我是二</h2>
                <Three></Three>
              </div>
            )
          }
        }
      </Consumer>
    )
  }
}
// 第二种方法
class Three extends Component{
  static contextType = myContext
  render (){
    return(
      <div>
        <h2 style={{color:this.context.color}}>我是三</h2>
      </div>
    )
  }
}
ReactDom.render(<App/>,document.getElementById('root'))

```
## react中Hook使用
Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

### useState
useState:  更改state数据
```js
const App1 = () => {

  const [name, setName] = useState('张三')
  const [age, setAge] = useState(18)
  return (
    <div>
      <h1>{name}</h1>
      <p>{age}</p>
      <button onClick={() => {
        setName('李四')
        setAge(24)
      }}>修改 name</button>
    </div>
  )
}
```
### useEffect
```js
//useEffect hook 用法
// 生命周期函数
// 1，componentDidMount
// 2. componentDidupdate

// useEffect(() => {
// 可以在函数里写构造函数
//   console.log('didMount、didUpdate')
// })

// 清除定时器。全局监听事件
// ？如何让 useEffect 实现卸载前
// ！给 effect 函数里面再返回一个函数，返回的函数会在组件销毁之前执行要有return（）
const App2 = () => {
  const [name, setName] = useState('张三')
  useEffect(() => {
    let timer = setInterval(() => {
      console.log(1);
    }, 1000);
    return () => {
      console.log('在APP2销毁之前执行')
      clearInterval(timer)
    }
  })
  return (
    <div>
      <p>{name}</p>
      <button onClick={
        () => {
          setName('李四')
        }
      }>点击修改名字</button>
    </div>
  )
}
//怎样 用useEffect实现性能优化，只有数据变化才能够执行
// 给useEffect传递第二个参数，是一个数组，数组中写上需要监听的数据
const App3 = () => {
  const [name, setName] = useState('张三')
  const [age, setAge] = useState(18)

  useEffect(() => {
    console.log('触发事件时我执行')
  }, [name])//数组里的数据就是监听事件
  return (
    <div>
      <h2>useEffect</h2>
      <p>{name}</p>
      <p>{age}</p>
      <button onClick={
        () => {
          setName('李四')
        }
      }>改名</button>
      <button onClick={
        () => {
          setAge(24)
        }
      }>该年龄</button>
    </div>
  )
}
```
### useContext
```js
// useContext 接受一个context对象
// 创建上下文对象
const MyCtx = React.createContext()
const App4 = () => {
  const [color, setColor] = useState('red')
  return (
    <MyCtx.Provider value={color}>//Provider 是组件要大写字母开头
      <div>
        <h1>app4</h1>
        <button onClick={
          () => {
            setColor("yellow")
          }
        }>改色</button>
        <hr />
        <One></One>
      </div>
    </MyCtx.Provider>
  )
}
const One = () => {
  return (
    <div>
      <h1>One</h1>
      <br />
      <Two></Two>
    </div>
  )
}
const Two = () => {
  return (
    <div>
      <h2>Two</h2>
      <br />
      <Three></Three>
    </div>
  )
}
const Three = () => {
  const value = useContext(MyCtx)
  return (
    <div>
      <h2 style={{ color: value }}>three</h2>
    </div>
  )
}
```

<style>
h3{
  font-size:18px;
}
.theme-default-content{
  font-size:18px;
}
</style>