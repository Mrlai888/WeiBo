---
title : 'React路由'
---
## react路由

### 路由意义
1. 前端路由为了实现单页面应用程序

### react路由简介
1. react-router     
2. react-router-dom (react-router 的高级版本  常用)
比方说 react-router 中有一个 Link 组件。而 react-router-dom 中除了 Link 外，还提供了 NavLink
### react路由使用
1. 安装依赖
```bash
npm install --save react-router-dom | yarn add react-router-dom
```
2. 不需要创建路由规则之类的文件，而是直接使用 它所提供的一些组件
    1. HashRouter     （hash模式）
    2. BrowserRouter   (history模式)
    3. 这两个组件是路由的实例组件，只需要选择一个放置在项目的根上面（最外层）
```js
import { HashRouter as Router} from "react-router-dom";

    <Router>
      <Switch>
        <Route path='/a' component={PageA}></Route>
        <Route path='/b' component={PageB}></Route>
      </Switch>
    </Router>
)
```
3. 在某个位置放置一个 Route 组件，给 Route 组件设置 path 与 component 属性。这个组件既可以看成是路由的规则，又是路由的坑
```js
        <Route path="/home" component={Home}></Route>
        <Route path="/list" component={List}></Route>
        <Route path="/about" component={About}></Route>
```
4. Route 中children,component,render的区别
component: 当你使用component属性时，router会通过你赋给该属性的值，使用React.createElement方法去创建一个新的React元素(不建议返回内联函数进行组件渲染)
```js
<Route path="path" component={Component}/>
```
render: render属性能使你便捷的渲染内联组件或是嵌套组件，你可以给这个属性传入一个函数，当路由的路径匹配时调用。同时，render属性也会接受所有由route传入的所有参数。
```js
<Route path="path" render={() => <div>这是内联组件写法</div>} />
```
children: children属性是这三个属性中比较特殊的一个，它的值为一个函数，**当Route有children属性时，不管当前的路径是否与Route匹配，该函数都会执行**同时，children属性也会接受所有由route传入的所有参数。
```js
	<Route path="path" render={() => <div>这是内联组件写法</div>} />
	//嵌套组合方式
	<Route path="path" render={ props => (
		<ParentComp>
			<Comp {...props} />
		</ParentComp>
	) />
```

### 路由页面组件（跟路由相关的组件就称为路由页面组件。）

#### 路由页面组件会自动接收到3个prop
1. history: 可以实现编程式导航
2. location: 可以获取 ? 号传参
3. match: 可以获取 动态参数

###  路由重定向 Redirect 组件
```js
 <Redirect to="/home"></Redirect>
 ```
###  路由拦截
react的路由拦截需要自己去封装高阶组件
```js
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
```


