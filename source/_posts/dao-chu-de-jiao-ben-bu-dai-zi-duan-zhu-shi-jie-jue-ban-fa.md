---
title: PowerDesigner 导出的SQL脚本不带字段注释，解决办法
date: 2023-04-16 08:55:00
---



### 问题
PowerDesigner默认导出来的SQL没有注解。这一点是因为你没有添加Comment。

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230416085113501-1696602724.png)

### 新问题

如果每个表都需要添加一个重复的Comment，那样太麻烦了。
所以可以直接改他的模板，把Comment换成Name。

原理 类似于 comment ${comment} => comment ${name}

菜单栏：Database > Edit Current DBMS... > 

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230416085300585-1617059584.png)

找到图中的ADD，
默认的模板是
```
%20:COLUMN% [%National%?national ]%DATATYPE%[%Unsigned%? unsigned][%ZeroFill%? zerofill][ [.O:[character set][charset]] %CharSet%][.Z:[ %NOTNULL%][%R%?[%PRIMARY%]][%IDENTITY%? auto_increment:[ default %DEFAULT%]][ comment %.q:@OBJTLABL%]]
```

改成
```
%20:COLUMN% [%National%?national ]%DATATYPE%[%Unsigned%? unsigned][%ZeroFill%? zerofill][ [.O:[character set][charset]] %CharSet%][.Z:[ %NOTNULL%][%R%?[%PRIMARY%]][%IDENTITY%? auto_increment:[ default %DEFAULT%]][ comment %.q:COLNNAME%]]
```

其实就是把 %.q:@OBJTLABL% 改成了  %.q:COLNNAME%。