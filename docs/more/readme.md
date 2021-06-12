---
title: '更多扩展'
---
## axios请求拦截器添加token

```js
// main.js
axios.interceptors.request.use(async config => {
  config.headers.Authorization = await window.sessionStorage.getItem('token')
  console.log(config)
  return config
})
```