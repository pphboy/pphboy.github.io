---
title: JS 高级 学习笔记
date: 2023-10-20 16:26:00
---

# JS 高级 学习笔记


JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置。

```javascript
let g = 1

function a(){
    let g = 2
    function b() {
        return g // g = 2 
    }
}
```
JS 函数调用，是放到 ECStack内，使用栈的方式进行调用。（和汇编里面的CALL写法应该是同一个逻辑）

```javascript
function a(){ 
    console.log("A")
}

function b() {
    a()
}

b()


// --------------------
ECStack.push(b)
ECStack.push(a)

ECStack.pop(a)
ECStack.pop(b)
```
这个叫作什么上下文栈，**Execution Context Stack**



函数要在执行时候，AO才会有值，默认情况下，这些变量会被加载成 undefined

```javascript
a = {
    AO: {
        arguments: { length:0},
        val1: undefined
    }
}
```


### 闭包
直接在代码块中，使用赋值，不算闭包

类似于如下，结果都是3

```Plain Text
var data = [];
 
for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}
 
data[0]();
data[1]();
data[2]();
```
如下则是闭包：

```Plain Text
var data = [];
 
for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}
 
data[0]();
data[1]();
data[2]();
```
发生此问题的原因是函数执行时的上下文不一样。匿名函数在执行时，活动对(AO)中已经有了i，这个i的值就是每次赋的值



而没有闭包的函数，则是使用的 是 全局上下文的对象变量，`globalContext.VO` ，而这时，函数则是之循环之后调用了，所以i值为3.