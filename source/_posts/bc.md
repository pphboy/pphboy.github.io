---
title: "TypeScript 报错：Type &#39;({ filename: string; createTime: string; filePath: string; fileId: number; } | undefined)[]&#39; is not assignable to type &#39;PiFile[]&#39;."
date: 2023-04-15 09:23:00
---


问题：
因为TypeScript不支持直接给一个接口类型的变量 赋一个未知的值。
如
```
const a:A = {
	name:'s'
};
```
你需要给这样的**对象**或**数组**值使用as 指定一个类型。

正确写法:
```
const a:A = {
	name:'s'
} as A;
```
数组写法一样:
```
const a:A[] = [
	{
		name:'s'
	}
] as A[];
```

使用 as 将一个值**断言**为 Type 类型。