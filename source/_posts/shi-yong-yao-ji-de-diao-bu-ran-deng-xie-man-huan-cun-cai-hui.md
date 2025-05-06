---
title: Damn !!!! 使用bufio.ReadWriter，要记得调 Flush()，不然等写满缓存才会Flush
date: 2024-12-01 23:04:00
---


bufio.ReadWriter
bufio.Writer

看文档，这个Writer. God Damn Lazy!

https://pkg.go.dev/bufio#Writer


![image](https://img2024.cnblogs.com/blog/2146100/202412/2146100-20241201230200353-23905229.png)


Damn !!!! 