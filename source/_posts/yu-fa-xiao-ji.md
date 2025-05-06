---
title: Unix C 语法小记
date: 2023-06-23 00:48:00
---


实际是要判断 numbytes 是否等于-1，而不是要判断结果赋给numbytes
```
if((numbytes = recv(sockfd, buf, sizeof buf,0)) == -1)

if(numbytes = recv(sockfd, buf, sizeof buf,0) == -1)
// 类似于
numbytes = (recv(sockfd, buf, sizeof buf,0) == -1)
```