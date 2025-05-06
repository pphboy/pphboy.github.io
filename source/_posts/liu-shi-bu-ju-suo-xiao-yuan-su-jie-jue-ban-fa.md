---
title: Flex|流式 布局 缩小元素解决办法
date: 2023-04-13 21:56:00
---


直接在子元素上把flex-shrink设置为0，即可。

```css
	.parent div {
		flex-shrink: 0;
	}
```


设置前
![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230413215500103-1156311855.png)

设置后
![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230413215523847-1578472223.png)

#### 完整代码
```css
.kanban-list {
  display: flex;
  width:100%;
  flex-direction: row;
  overflow-y: auto;
  overflow-x: auto;
}


.kanban-list>div {
  flex-grow: 1;
  /* flex-shrink是设置缩小比例，设置为0即为 不缩小 */
  flex-shrink: 0; 
  flex-basis: 400px;
}

```