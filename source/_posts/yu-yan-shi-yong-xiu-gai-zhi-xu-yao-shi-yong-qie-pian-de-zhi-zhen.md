---
title: Go语言使用range修改值，需要使用切片的指针 &amp;slice[index]
date: 2023-11-05 18:33:00
---

**由于 Value 是值拷贝的，并非引用传递，所以直接改 Value 是达不到更改原切片值的目的的，需要通过 &slice[index] 获取真实的地址**

```go

package main

import ("fmt")

func main(){
	slice := []int{10,20,30,40}
	for index,value := range slice {
		fmt.Printf("Value = %d, value-addr = %x, slice-addr = %x \n", value , & value, &slice[index])
	}
}

```

![image](https://img2023.cnblogs.com/blog/2146100/202311/2146100-20231105182226762-1488541448.png)
