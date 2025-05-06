---
title: Java的两个好用的工具包 Apache commons 
date: 2021-01-16 10:35:00
---

#### Apache commons 介绍

这是apache commons lang3的工具类的截图
这个工具，小皮一般用在业务层较多
![](https://img2020.cnblogs.com/blog/2146100/202101/2146100-20210116103210175-96641953.png)

这是apache commons codec下面的工具
这个工具包，今天发现的，小皮主要用来加密
![](https://img2020.cnblogs.com/blog/2146100/202101/2146100-20210116103330268-2097421247.png)


##### maven地址
```
<!--apache 工具类-->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.11</version>
</dependency>
<!--加密的包-->
<dependency>
    <groupId>commons-codec</groupId>
    <artifactId>commons-codec</artifactId>
    <version>1.15</version>
</dependency>

```