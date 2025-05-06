---
title: "Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to 解决办法"
date: 2021-07-14 00:42:00
---

main.js 配置如下


```js
import Router from 'vue-router';
//路由导航冗余报错（路由重复）
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
```