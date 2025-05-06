---
title: Go 面向接口编程
date: 2023-11-10 10:15:00
---


接口有什么用？就是存储未实现的方法，作为实现的此方法的结构体的实例的句柄。

```
type Sayer interface {
	say()
}

type Dog struct {}
type Cat struct {}

func (*Dog) say() {
	fmt.Println("Woew woew")
}

func (*Cat) say() {
	fmt.Println("Meow meow")
}


func main() {
	var x Sayer
	x = &Cat{}
	x.say()
	x = &Dog{}
	x.say()
}

```

![image](https://img2023.cnblogs.com/blog/2146100/202311/2146100-20231110101420251-432077640.png)
