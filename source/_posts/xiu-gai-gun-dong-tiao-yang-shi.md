---
title: Vue3 ，html 修改滚动条样式
date: 2023-05-29 21:36:00
---

```
/* 滚动条 */
body *::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}
body *::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 2px;
}
body *::-webkit-scrollbar-thumb {
  background: rgb(205, 206, 206);

  border-radius: 10px;
}
body *::-webkit-scrollbar-thumb:hover {
  background: #333;
}
body *::-webkit-scrollbar-corner {
  background: #fff;
}
```