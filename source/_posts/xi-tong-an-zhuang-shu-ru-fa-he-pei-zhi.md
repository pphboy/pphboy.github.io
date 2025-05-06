---
title: Wslg Debian系统安装Fcitx5 输入法，和配置
date: 2023-08-04 21:28:00
---

# Debian配置Fcitx5输入法

```sh
sudo apt install fcitx5 fcitx5-rime
```

放到 `~/.profile` 的配置
```sh
export LC_CTYPE="zh_CN.UTF-8"
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
export SDL_IM_MODULE=fcitx
export XIM=fcitx # 配置了这个，就可以在emacs中使用fcitx5
export XIM_PROGRAM=fcitx
fcitx5 --disable=wayland -d  --verbose '*'=0 # autostart


```
![image](https://img2023.cnblogs.com/blog/2146100/202308/2146100-20230804212757952-868285824.png)
