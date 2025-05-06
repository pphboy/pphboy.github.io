---
title: 重学SpringBoot. step7 高并发 秒杀
date: 2022-05-11 20:30:00
---

# 高并发

高并发最容易出现的问题就是数据安全能不能得到保障。

你需要保证速度，又需要保证数据安全，那么速度也必然会有所下降。

所以最简单的办法就是提升硬件。或者把Mysql换成MongoDB，加个Redis，等等。
其实最好的办法就是加Redis，因为你的资料的占用时间不会太长，也就没有什么影响，任务可以等到后面再处理数据。

书上的思路上，先把数据存到Redis，然后再凌晨一点时候，没有什么人的时候，再用空余的资源去处理这些数据。

但要思考的还是数据安全的问题，Redis万一挂了怎么办？当然这些问题不是高并发目标要解决的问题。

现在是使用SpringBoot相关的技术来实现一个1000到2000的并发的解决方案。

我在实操的时候，2000的并发，会有600多是服务器无法处理的，因为超时了，等等。整体而言就是反应不过来，服务器如果不用缓存技术，除非提升硬件，那么根本处理不过来。

集群？是个好办法，建议把服务器全升级到线程撕裂者。然后配一百个集群。

## 直接用Redis

业务需求：秒杀抢购

思路：获取库存，然后判断Redis列表内的数量是否等于库存，如果不等于，就添加，如果等于，就是抢购失败。

缓存后的数据直接用消息队列控制主机的服务来处理这些数据。单机的话，可以用定时器到凌晨1点，再用空余的资源来解决这些问题。


代码实现可能都不用看了。


不过我之前学的时候，还有一种方案是引入这个任务队列，不过我好像没学会用Netty怎么来操作这种秒杀。那样就更为底层了。


下面是传统的基于版本号的秒杀。

```java
public boolean buyId(Integer id) {
    long start = System.currentTimeMillis();
    while (true) {
        long end = System.currentTimeMillis();
        if((end - start) > 100) return false;
        Product product = this.getById(id);

        if(product.getStock() < 1){
            return false;
        }
        // 指定 delete Flag为 version吧
        int version = product.getDeleteFlag();

        product.setStock(product.getStock()-1);
        product.setDeleteFlag(version+1);
        boolean result = this.update(product,new QueryWrapper<Product>().lambda().eq(Product::getId,product.getId()).eq(Product::getDeleteFlag,product.getDeleteFlag()-1));

        if(!result) continue;

        return true;
    }

}
```