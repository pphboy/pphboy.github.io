---
title:  Bootstrap的Modal与WebUploader联用的问题及办法 
date: 2020-12-17 19:15:00
---

问题描述：在使用Bootstrap的Modal的时候，在Modal中用了WebUploader插件，然后WebUploader的绑定按钮无法点击

在网上找了一些结果，觉得，他们的问题解决方案感觉都不够完整

例如:https://www.cnblogs.com/guohu/p/6483043.html

```html
<div id="uploader-demo">
    <!--用来存放item-->
    <div id="fileList" class="uploader-list"></div>
    <div id="filePicker">选择图片</div>
    <div id="imageFile"></div>
</div>
```

我是给filePicker绑定一个点击事件，通过此点击事件来控制WebUploader插件的触发

```js
$("#filePicker").click(function(){
    $('#filePicker input[name="file"]')[0].click();
});
```
效果图
![](https://img2020.cnblogs.com/blog/2146100/202012/2146100-20201217191503140-689449257.png)
