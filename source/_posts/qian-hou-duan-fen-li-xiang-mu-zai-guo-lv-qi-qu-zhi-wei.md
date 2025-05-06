---
title: SpringBoot+Vue前后端分离项目，在过滤器取值为Null
date: 2021-06-22 10:14:00
---

SpringBoot+Vue前后端分离项目，在过滤器取值为Null
是因为SessionID的问题，因为axios每次的请求都是一次新的sessionId，所以只需要在main.js下配置如下

```js
axios.defaults.withCredentials=true;

```