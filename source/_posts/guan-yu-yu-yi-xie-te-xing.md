---
title:  关于Vue2.x与Es6一些特性
date: 2022-05-16 18:49:00
---

# 关于Vue2.x与Es6一些特性

Vue的定位，就是快速开发。

这些特性，我没有过于熟练，导致写的代码质量不高。


## 过滤器

```html
<template>
    <div>
        {{title | myFilter}}
    </div>
</template>

<script>
    export default {
        name: "MyFilter",
        data(){
                return {
                title:"MyTitle   =》 "
            }
        },
        filters:{
            myFilter(data){
                // 处理数据
                return data+'myFilter';
            }
        }
    }
</script>
```



## Promise

两个请求，需要有先后顺序，但Ajax请求只能异步请求，所以可以进行嵌套执行，但嵌套执行可能会影响维护。

```js
async created() {
    await this.abc()
    await this.jkl();
},
methods:{
    abc(){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                for (let i = 0; i <10; i++) {
                    console.log("abc"+i)
                }
                resolve("abc") // 放行promise
            },1000)
        })

    },
    jkl(){
        console.log("jkl")
    }
},
```