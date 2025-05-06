---
title: Golang 高效并发安全的字节池
date: 2023-08-16 12:24:00
---


记录一下，这里学的BytePoolCap, 和sync.Pool
总之就是这个BytePoolCap比sync.Pool快一些，目前不会测试，后面测试了再来填坑。

```
package main

import (
	"fmt"
)


func main() {
	//	var bpool BytePoolCap
	bp := NewBytePoolCap(500,1024,1024)
	buf := bp.Get()
	defer bp.Put(buf)
	fmt.Println()
}

type BytePoolCap struct {
	c chan []byte
	w int
	wcap int
}

func (bp *BytePoolCap) Get() (b []byte)  {
	select {
	case b = <- bp.c:
		// ?
	default:
		// create new buffer
		if bp.wcap > 0 {
			b = make([]byte, bp.w, bp.wcap)
		} else {
			b = make([]byte, bp.w)
		}
	}
	
	return
}

func (bp *BytePoolCap) Put(b []byte) {
	select {
	case bp.c <- b:
		// buffer went back into pool
	default:
		// buffer didn't go back into pool, just discard
	}
}

func NewBytePoolCap(maxSize int, width int, capWidth int) (bp *BytePoolCap) {
	return &BytePoolCap{
		c: make(chan []byte,maxSize),
		w: width,
		wcap: capWidth,
	}
}


```