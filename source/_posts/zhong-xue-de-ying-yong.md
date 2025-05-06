---
title: 重学SpringBoot. step4 Redis的应用
date: 2022-05-09 11:40:00
---

## Redis的应用
Redis支持的七种数据类型：字符串、散列、列表（链表）、集合、有序集合、基数和地理位置，具体用Java怎么操作其实可以直接看redisTemplate的源代码。

Redis引出来的概念有对象序列化、Redis事务、Redis流水线、Redis消息监听器

对象序列化用于把Java对象直接存储到Redis中



Redis事务，Redis事务的命令不会马上执行，而是会有一个Redis任务队列，将这些任务一步步执行。

监控的数据在一开始就发生了变化，则就不会执行事务。

redis exec命令执行后才能报出错误，后面的命令依旧会被执行。

### 注解缓存
一般用户是直接通过redisTemplate直接存取用户数据，在我之前的项目中需要有这样的场景，需要给每个数据加上缓存，但问题就是，Redis注解的缓存是会读取脏数据的，也就是数据更新不即时。

SpringBoot Redis给我们提供了两个注解，CachePut，Cacheable，一个更新数据，一个是查询数据。

CachePut将对应的key的值进行修改缓存，Cacheable直接取与对应Key的值就行。

如果数据没有使用CachePut，或者没有手动的更新，那么将可以会出现脏数据的可能，即Redis数据与MySql数据不同步。这个还是非常的危险的