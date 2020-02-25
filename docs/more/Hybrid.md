---
title : "混合开发（Hybrid）"
---
## 混合开发

### 原生调用js

  Native调用JS语言，是通过UIWebView组件的*stringByEvaluatingJavaScriptFromString*方法来实现的,该方法返回JS脚本的执行结果.
```js
//Swift
WebView.
stringByEvaluatingJavaScriptFromString("alert(1)")
//OC
[webView.stringByEvaluatingJavaScriptFromString:@"Math.random();"]

```
### js调用原生

定义好JS需要调用的方法，添加到window对象上，则可以在UIWebView加载url完成后，在web页面调用window上的这个对象
```js
//定义一个点击事件
<button onclick="handleClick()"></button>

function handleClick(){
//调用原生添加到window的方法（例如调用拍照方法photo)
window.photo()
}

```
### 总结
```text
OC/Swift/Android调用JS
   直接用一些方法执行我们js中的一些语句，也就是说，我们最好定义一些对象，上面放着一些方法准备被native调用，当然也就可以在这些方法里传点参数啥的给咱们了 

JS调用IOS
    咱们可以整一个请求发出去，这个请求呢会被native给拦截到，他就知道啥意思了 (Iframe) 

JS调用Android 
    也跟调用IOS一样，搞个请求，用个iframe
      Android能想办法给咱们的window对象上挂个东西，比如JSBridge啥的，然后我们js可以直接调用
     Android能把咱的prompt、console.log、alert给重写，也就是说咱用alert已经不能弹出了，反而能给Android传参数了，但是一般不会重写alert，重写的都是不怎么用的prompt 

```
