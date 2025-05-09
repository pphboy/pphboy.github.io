---
title: SpringBoot 学习 step.3数据库
date: 2022-05-09 11:31:00
---

## 数据库
JPA默认用的是Hibernate。

SpringBoot开发WEB应用时，目前菜用较多的是mybatis+mybatis-plus，还有是springboot-data-jpa，jpa默认使用的是hibernate

jpa更像是mybatis-plus+mybatis的结合体，不过mybatis的插件体系，让mybatis走的是逆向工程，而hibernate是正常的生成工程。

也就是说，hibernate需要的是UML模型，mybatis需要的是数据库模型。

hibernate重业务，mybatis轻业务更轻便

也就是说hibernate的模型是对应着业务出来的，而mybatis就是偏向于专门处理数据库相关的功能。

至于使用的话，可以看看文档，这些内容无非就是定义接口定义类，或者重写类。

## 数据库事务处理
这个牵涉的数据库理论知识较多，因为只有知道这些理论才能明白。

首先为什么会需要事务，事务用来解决什么问题？遇到 了什么问题？

在实际的业务场景中，需要进行处理并发问题，像两个人同时买东西，如果库存为0，那么就只有一个人能买到，还有数据更新问题。其实这些都是非常常见的数据库数据的更新问题。

数据库四个基本特征：原子性、一致性、隔离性、持久性

在很大程度上，数据库在生产环境中是会可能达到数以万计级别的访问，这时，就会遇到读写锁和丢失更新还有性能问题。

第一，性能是用户直观的感受，没有人在乎你后台做了什么。

第二，读锁与写锁，必然会导致响应速度下降。

第三，丢失更新，用户获取的数据没有得到即时的更新

这些问题需要通过特定的任务手段进行解决，如任务队列，数据库串行化。

数据库的隔离级别就是通过底层来控制SQL脚本的执行和更新问题。隔离级别越高，性能越低。

### 传播行为
即当前的方法与被调用的方法都会被置于统一的隔离级别。