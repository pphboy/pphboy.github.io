---
title: VSCODE 关闭 go  的test缓存
date: 2023-08-29 23:40:00
---

`Ctrl + ,` 进入设置，搜索 `go testFlags`

![image](https://img2023.cnblogs.com/blog/2146100/202308/2146100-20230829233851922-925799478.png)

点击 `Edit in settings.json`

在内添加 `"-count=1"`
![image](https://img2023.cnblogs.com/blog/2146100/202308/2146100-20230829233923245-1199998176.png)
