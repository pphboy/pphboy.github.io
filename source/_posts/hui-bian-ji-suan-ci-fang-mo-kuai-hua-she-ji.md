---
title: 8086汇编计算次方，模块化设计
date: 2023-04-01 11:41:00
---


就是把dw那一行的每个字的数据，求三次方，然后存到 dd 那一行


```asm
assume cs:code,ds:data

data segment
	dw 1,2,3,4,5,6,7,8
	dd 0,0,0,0,0,0,0,0 ;; 双字，32位
data ends

code segment

main:
	mov ax,data
	mov ds,ax

	call cul ;; 放到子程序里计算

	mov ax,4c00h
	int 21h

cul:
	mov si,0
	mov di,16 ;; 双字的开始
	mov cx,8

	s:
		mov ax,[si]
		mul word ptr [si]
		mul word ptr [si]
		; mov bx,[si]
		; mul bx
		; mul bx

		mov word ptr [di],ax ;; 低位放 ax
		mov word ptr 2[di],dx ;; 高位放dx

		add si,2 ;; 因为 单字 ，只需要 两个内存单元
		add di,4 ;; 双字，需要 四个内存单元

		loop s
	ret 
code ends
end main
```

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230401114109340-1935925048.jpg)
