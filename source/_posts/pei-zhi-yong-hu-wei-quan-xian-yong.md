---
title: debian 11 配置 用户为 root权限用
date: 2023-04-19 13:53:00
---

记
```bash
su
vi /etc/sudoers
```
默认权限是只读的
![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230419135146017-480558948.png)

```
# 等下要改回去
chmod 777 /etc/sudoers
```


把root 那一行复制
![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230419135257811-1081246842.png)

保存后

```
# 等下要改回去
chmod 440 /etc/sudoers
```
