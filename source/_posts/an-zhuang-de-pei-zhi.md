---
title: FreeBSD 安装 fcitx5的配置
date: 2022-05-30 09:03:00
---

link: [Chinese Pinyin Package for typing Chinese](https://forums.freebsd.org/threads/chinese-pinyin-package-for-typing-chinese.78472/ "Chinese Pinyin Package for typing Chinese")

```bash
sudo pkg install -y zh-CJKUnifonts
sudo pkg install -y fcitx5 fcitx5-configtool fcitx5-gtk zh-fcitx5-rime zh-rime-wubi
```
这个放到 ~/.xinitrc
```shell
setenv LC_CTYPE "zh_CN.UTF-8"
setenv GTK_IM_MODULE "fcitx5"
setenv GTK3_IM_MODULE "fcitx5"
setenv QT_IM_MODULE "fcitx5"
setenv QT4_IM_MODULE "fcitx5"
setenv xmodifiers "@im=fcitx5"
setenv LC_ALL "zh_CN.UTF-8"
```

下面放到：~/.xprofile
```shell
export XIM=fcitx5
export GTK_IM_MODULE=fcitx5
export QT_IM_MODULE=fcitx5
export XIM_PROGRAM=fcitx5
export XMODIFIERS="@im=fcitx5"
```

final : [fcitx5 New implementation of the Fcitx IME framework](https://www.freshports.org/textproc/fcitx5/#message "fcitx5 New implementation of the Fcitx IME framework")

## 皮肤配置

https://www.cnblogs.com/maicss/p/15056420.html

https://github.com/thep0y/fcitx5-themes

### 单行输入框

若想输入法变成单行模式，还得再修改一个配置文件。 以fcitx5-rime为例：

vim ~/.config/fcitx5/conf/rime.conf
添加：

```
PreeditInApplication=True
```