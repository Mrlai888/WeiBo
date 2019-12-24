---
title: react-props
---
## props 的默认值设置

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

## prop的校验

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
