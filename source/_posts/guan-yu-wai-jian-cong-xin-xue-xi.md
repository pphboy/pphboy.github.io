---
title: 关于Mysql外键从新学习
date: 2021-03-02 16:35:00
---

# 关于Mysql外键从新学习

参考：https://blog.csdn.net/u010373419/article/details/9321331

`说实话，这是一个抄剩饭的文档。`

### 为什么会从新学习外键

因为考试。

在实际开发中，可能用外键的情况不多，至少我设计我自己的项目是不会用外键。用了后，数据不自由了。当然，如果表设计后，给数据表加上外键，可能是一种不错的选择，但，自己的项目还是不会使用外键来约束自己的数据。至少我在代码中，做到部分的数据约束。

### Mysql外键的关键

**Innodb**，如果引擎不是Innodb是无法添加外键的。我试了，一个小时，看了很多文档，然后51jb的网站一个文章讲了关于Innodb，必须是Innodb，否则外键的设置会失效。（虽然那个CSDN的博文也讲了，但我确实试了一个小时，总以为是我的代码的问题）

### 代码

#### 建表

```
CREATE TABLE class(
id INT PRIMARY KEY AUTO_INCREMENT,
cname VARCHAR(20) NOT NULL
)ENGINE = INNODB DEFAULT CHARSET=utf8;

CREATE TABLE student(
id INT PRIMARY KEY AUTO_INCREMENT,
sname VARCHAR(20) NOT NULL,
cid INT NOT NULL,
CONSTRAINT stu_f_key FOREIGN KEY (cid) REFERENCES class(id) ON UPDATE CASCADE
)ENGINE = INNODB DEFAULT CHARSET=utf8;

# 插入数据
INSERT INTO class(cname) VALUES('计应1班'),('计应2班');
INSERT INTO student(sname,cid) VALUES('小皮',1),('小王',2);
```

![image-20210302162447686](https://gitee.com/imgsbed/images/raw/master/img/image-20210302162447686.png)

#### 操作

**因为使用了** on update cascade

使用，我们修改class的id，相应的student的cid也会改变

```
UPDATE class SET id = 3 WHERE id = 1;
SELECT * FROM student;
```

![image-20210302162739782](https://gitee.com/imgsbed/images/raw/master/img/image-20210302162739782.png)

##### 关于on delete cascade

on delete xxx,on update xxx 属于级联操作，使用on delete时候要小心，因为如果使用on delete cascade ，如果删了class的实例，则会删除student的实例。

on delete set null。当外键所约束的实例被删除时，将当前实例的所有字段值设置为空。

### 总结

其实用级联很少，总是听别人说影响效率，当然，数据小的时候，不会出什么问题。如果数据大了，则需要优化数据库和查询语句。（不过这些目前我都没有学）。