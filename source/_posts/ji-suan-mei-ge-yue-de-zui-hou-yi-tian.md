---
title: JS 计算每个月的最后一天
date: 2023-11-20 09:41:00
---


 拿下个月的第一天，减 24小时即可

24小时 = 86400000 毫秒


```
    const maxDate = new Date(
      new Date(mainDate.value.setMonth(mainDate.value.getMonth() + 1)).setDate(
        1
      ) - 86400000
    );
```