---
title: 王爽汇编第9章实验  将字符串显示到 显示器上
date: 2023-03-16 23:10:00
---

* 效果如下
![image](https://img2023.cnblogs.com/blog/2146100/202303/2146100-20230316230911291-3045406.gif)


* 8086汇编代码如下

```asm
assume cs:code,ds:data

data segment
	db 'ABCDEF'
data ends

code segment
start:
	mov ax,data
	mov ds,ax

	mov ax,0B800H
	mov es,ax

	mov cx,8
	mov si,0140h
	mov di,0
	mov bx,0
s1:
	mov dx,cx
	mov cx,6
s2:		
	mov al,[bx]
	mov es:[si],al

	mov byte ptr es:[si+1],11000010B

	inc bx
	add si,2
	loop s2
	mov cx,dx

	sub si,12;; 重置si
	mov bx,0 ;; 重置bx,把指针重新指到 数据段的首位 A的位置

	add si,00A0H  ;; +A0就是+80，相当于在显示器中换行 

	loop s1 ;;大循环

	mov ax,4c00h
	int 21h
code ends

end start

```