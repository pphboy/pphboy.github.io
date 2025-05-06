---
title: Go语言连不上 Mysql
date: 2023-09-16 23:15:00
---

1.dial tcp 127.0.0.1:3306: connect: connection refused

因为 mysql安装时，的配置有一个关闭网络连接，所以连不上

文件在  /etc/my.cnf.d/mariadb-server.cnf
把这信skip-networking注释了即可

```sh
[mysqld]
# skip-networking
```