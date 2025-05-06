---
title: Mybatis获取插入值的ID
date: 2020-12-24 08:54:00
---

**需求: 在后台做多次插入的时候,需要使用返回ID,然而普通的操作是无法做到的**
* Mybatis可以在insert的标签 上加上 keyProperty='id' useGeneratedKeys="true"来获取值
* 问题: 一直没有办法获取到它主键ID的值
```xml
<insert id="insertOptionInfo" parameterType="map" keyProperty="id" useGeneratedKeys="true">
        INSERT INTO `shopping`.`option_info`(`id`, `name`, `type`) VALUES (null, #{name}, 0)
    </insert>
```
* 解决: 因为使用的是Map做为参数,然后其返回的Id的值事实上,会存到我们做为参数的这个ID
```java
@PostMapping("admin/info/send")
    public Map<String,Object> sendOptionInfo(@RequestBody Map<String,Object> map) {
        System.out.println(map);
        if(map.get("id") != null) {
            om.updateOptionValue(map);
        }else {
            om.insertOptionInfo(map);
        }
        return map;
    }
```

* 下面是其在前端的返回值
![](https://img2020.cnblogs.com/blog/2146100/202012/2146100-20201224085337263-1365715303.png)
