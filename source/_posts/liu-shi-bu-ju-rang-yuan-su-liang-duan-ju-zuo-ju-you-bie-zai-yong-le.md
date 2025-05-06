---
title: Flex| 流式 布局 ，让元素两端居左，居右，别再用float:right了
date: 2023-04-13 22:14:00
---


主要代码是
```css {
.parent {
	justify-content: space-between;
}


```

完整代码案例

```css
.tasklist{ 
  height: calc(80vh);
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #ccc;
  border-radius: 4px;
  }

  .taskhead {
    display: flex;
    height: 50px;
    align-items: center;
     justify-content: space-between;
  }


```


修改前
![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230413221334849-1387646502.png)

修改后
![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230413221348354-349798982.png)
