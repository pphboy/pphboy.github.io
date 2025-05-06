---
title: 监听浏览器联网状态
date: 2023-12-12 20:35:00
---

```js
window.addEventListener('online', function() {
  console.log('浏览器已连接网络');
});

window.addEventListener('offline', function() {
  console.log('浏览器已断开网络');
});
```