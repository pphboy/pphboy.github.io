---
title: LocalDateTime 接收JSON和转JSON使用注解 
date: 2023-04-23 16:43:00
---

前端接收的时间为字符串也可以使用这样。

```
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;

```

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230423164340238-608162353.png)
