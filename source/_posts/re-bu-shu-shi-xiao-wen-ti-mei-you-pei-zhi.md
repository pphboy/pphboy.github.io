---
title: Idea 2023 热部署失效问题 没有配置 OnFrame
date: 2023-04-21 08:14:00
---

yml 配置
```yml
spring:
  devtools:
    restart:
      enabled: true
      additional-paths: src/main
      additional-exclude: test/**
```

依赖坐标
```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-devtools</artifactId>
	<scope>runtime</scope>
	<optional>true</optional>
</dependency>
```

我的实际情况是不配置这个Onframe我的代码写了，且更新了，但不生效。

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230421081142164-268250438.png)

在界面上有一个`Modify Options`选项

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230421081241912-1166166076.png)

OnUpdate和OnFrame都设置成 `Update classes and resources`
