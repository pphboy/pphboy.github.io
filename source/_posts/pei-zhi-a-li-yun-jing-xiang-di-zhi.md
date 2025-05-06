---
title: Maven配置 阿里云镜像地址
date: 2021-07-30 21:54:00
---


```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings>
	<mirrors>
	   <mirror>
		<id>alimaven</id>
		<name>aliyun maven</name>
		<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
		<mirrorOf>central</mirrorOf>       
	  </mirror>
	</mirrors>
</settings>
```