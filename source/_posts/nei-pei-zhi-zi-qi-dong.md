---
title: WSL 2 内配置Fcitx自启动 
date: 2022-01-17 08:29:00
---

### 前言
我通过配置成fcitx进行服务进行，但其权限是root，在普通模式下无法使用
我用的是xserver （ moba xterm），我要在gtk mode 下启动fcitx，其实 不用这么写

### 操作
直接在.profile如下命令
```bash
fcitx  >/dev/null 2>&1
```
fcitx启动是单例，而且也关闭了日志，也算自启动的一种方式吧