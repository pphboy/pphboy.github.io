---
title: Linux 安装 WIFI驱动 rtl8188gu
date: 2022-03-18 13:46:00
---

https://www.wyr.me/post/623

https://www.leonlu.cc/hobby/note006-rtl8188gu-linux/

亲测：debian11，manjaro xfce 22能装

manjaro需要把内核版本改成510

```bash
# 执行下面的命令
sudo mhwd-kernel -li
sudo mhwd-kernel -i linux510 rmc
```
