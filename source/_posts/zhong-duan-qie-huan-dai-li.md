---
title: Bash终端切换代理
date: 2023-11-12 16:04:00
---


```
 proxy(){
        export proxy="http://172.17.32.1:7890"
        export http_proxy=$proxy
        export https_proxy=$proxy
 }

 no_proxy(){
        export proxy=""
        export http_proxy=$proxy
        export https_proxy=$proxy
 }
```