---
title: SpringBoot+mybatis的驼峰命名转换不生效
date: 2021-01-07 22:15:00
---

* 使用SpringBoote+mybatis在mybatis-config.xml的配置文件内配置的驼峰命名不生效
* 然后我就将mybatis的配置写在application.yml内，然后就生效了
* 用注解 ，和xml配置的Mapper接口类，都 是可以的

**遇到的坑**
下面红色指的两个配置不能同时出现
![](https://img2020.cnblogs.com/blog/2146100/202101/2146100-20210107221015808-853940210.png)
