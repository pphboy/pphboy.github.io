---
title: vue-ts坑
date: 2021-01-07 08:26:00
---


```
<template>
  <div class="test">
    123123
  </div>
</template>

<script lang="ts">
import { Component,Options, Vue } from "vue-class-component";

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
  // 所有的组件选项都可以放在这里
  template: '<button @click="onClick">Click!</button>'
})
export default class Header extends Vue {
  // 初始数据可以直接声明为实例的 property
  message = "Hello!";

  // 组件方法也可以直接声明为实例的方法
  onClick(): void {
    window.alert(this.message);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.test {
}
</style>

```


![](https://img2020.cnblogs.com/blog/2146100/202101/2146100-20210107082515479-447618932.png)
