---
title: Vue3 防止子组件触发父组件 点击事件 
date: 2023-04-15 07:43:00
---


需求：我在写一个todocard,当我点击checkbox时候，父组件也会触发。
我需要在点击子组件checkbox的时候，父组件不触发。

解决方案：
在子组件上加 `@click.stop`

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230415074240195-1270092625.png)
