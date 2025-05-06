---
title: WSL 配置输入法
date: 2022-01-16 21:43:00
---

1. 安装输入法
```
sudo apt install dbus-x11 im-config fonts-noto fcitx fcitx-pinyin fcitx-sunpinyin fitx-googlepinyin
```


2. 设置自动启动
命令行执行
```
fcitx-autostart
```



3. 编辑 ​​~/.profile​​
```shell
# 也可放在/etc/default/locale里面
export LANG=zh_CN.UTF-8
# 也可放在/etc/environment里面
export INPUT_METHOD=fcitx # wayland输入法
export XMODIFIERS=@im=fcitx # x11输入法
export GTK_IM_MODULE=fcitx # gtk输入法
```

4. 刷新~/.profile配置文件
```
source ~/.profile
```

成功截图
![image](https://img2020.cnblogs.com/blog/2146100/202201/2146100-20220116214234649-317890872.png)
