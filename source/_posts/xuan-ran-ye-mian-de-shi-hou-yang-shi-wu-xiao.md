---
title: v-html渲染页面的时候 css样式无效
date: 2021-01-31 14:27:00
---

感谢： https://www.cnblogs.com/niuxiaoxian/p/9443873.html

当我们用v-html渲染页面的时候会发现样式并没有添加上，如下

复制代码
```
 <template>
      <div >
          <div v-html="some_html" class="box" ></div> 
      </div> 
 </template> 
 <style scoped> 
   .box  p{ color: red; } 
 </style>
```
复制代码
解决办法：在写样式的时候添加   >>>   如下所示
```
 .box  >>> p { color: red; }
```