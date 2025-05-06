---
title: Alpine Linux 换源
date: 2023-09-10 10:27:00
---


```sh
vi /etc/apk/repositories
```

```sh

echo "http://mirrors.aliyun.com/alpine/v3.18/main
http://mirrors.aliyun.com/alpine/v3.18/community" >  /etc/apk/repositories 

```