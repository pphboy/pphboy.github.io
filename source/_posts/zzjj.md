---
title: "【转载】JAVA - 解决：Java.lang.NoClassDefFoundError: javax/xml/bind/JAXBException"
date: 2021-08-03 10:42:00
---

抄：https://www.cnblogs.com/sunylat/p/13339507.html

问题原因：

高版本的JDK中不包含javax.xml.bind包了！

解决方法：

1，如果是maven管理依赖，则在pom.xml中加入：

```xml
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.3.0</version>
</dependency>
```
2，也可以单独下载这个JAR包，随后在工程里添加这个JAR包就可以了！