---
title: layedit 清空 编辑器
date: 2020-12-01 07:50:00
---

#### 使用layedit.setContent(index,"") 即可以清除
```
layui.use('layedit', function(){
    var layedit = layui.layedit;
});
var layedit = layui.layedit;
var index = layedit.build('demo'); //建立编辑器

layedit.setContent(index,"") //清除编辑器内容
```