---
title: 8086汇编 实验 10
date: 2023-04-01 19:28:00
---




### 显示字符串
```
assume cs:code,ds:data,ss:stack

data segment
	db 'Welcome to masm!',0
data ends

stack segment
	dd 16 dup(0)
stack ends

code segment
start:
	mov ax,0B800H
	mov es,ax
	mov ax,data
	mov ds,ax
	mov ax,stack
	mov ss,ax
	mov sp,32 ;; 初始化段址寄存器
	
	mov dh,10 ;; 行号
	mov dl,0 ;; 列号
	mov ch,0
	mov cl,11000010B ;;颜色 

	call show_str

	mov ax,4c00h
	int 21h

show_str:
	mov ax,0
	mov al,160 ;; 每段的字符数量
	mul dh ;; 字符数 乘以 行号

	mov dh,0 ;; 00[dl] == 00A0H
	add ax,dl ;; 每行起始为 0 ，+dl 就是 列的偏移

	mov si,ax ;; 每行字符不超过160，总共是25行，所以用 16位乘法刚好
	mov di,0 ;; 初始化 ds的偏移地址寄存器
	
	mov dl,cl ;; 保存cx 到 dx中，也就是存放的 cl 数据

	s:
		mov ch,0
		mov cl,[di]
		jcxz out  ;; 如果 cl 为 0 ，则是已到最后 一个 字符，跳出循环
		;; 判断完后，恢复cx

		mov byte ptr es:[si],cl;; 这个cl是 字符的信息
		mov byte ptr es:[si+1],dl

		inc di
		add si,2

		loop s
	out:
		mov byte ptr es:[si],'0'
		mov byte ptr es:[si+1],11000010B
		ret

code ends

end start

```
![imag1e](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230401192726426-723514903.gif)

### 解决除法溢出

下面是思路，要先看题目再看思路

第一版的时候，只能 支持0FFFFFFF内的数字进行修改

主要难以计算高位的除法的存储问题。

FFFF0000是除不了的，只能拿到FFFF来除

结果是
FFFF0000 的结果 是不是等于 （FFF0/CX + (F0/CX)/10H）* 1000H

所以这里有就有思路了，而且还能保留精度，就是把最后一位的数乘10，会得到一个准确值，你把这个值除10H，还会得到余数。

(F0/CX)  ,AX = 商， DX=余数

```
高位 = (FFF0/CX + (F0/CX)/10H )
低位 = 余数*1000H + (FFFF/CX)

 (FFFF/CX)，AX=商，DX=余数

 低位 = 余数*1000H + AX

 CX = DX ; CX里放的就是余数
 

```
```
assume cs:code,ds:data,ss:stack

data segment
	dd 16 dup(0)
data ends

stack segment
	dd 16 dup(0)
stack ends

code segment
start:
	mov ax,stack
	mov ss,ax
	mov ax,data
	mov ds,ax
	
	;; 只能算 0FFFFFFF 内的除法
	mov ax,4243H
	mov dx,0FFFFH
	mov cx,000AH
	mov sp,3
	
	call divdw

	mov ax,4c00h
	int 21h

;; 返回 ax = 低16位
;; dx = 高16位
;; cx = 余数
divdw:
	push ax
	call divhigh

	mov di,0
	mov word ptr [di],ax ;; 高位商 保留值
	mov word ptr [di].2,dx ;; 低位商

	pop ax

	;; 计算 ax 除 cx
	mov dx,0
	div cx
	;; 余数在 dx中，商在 ax中 
	mov cx,dx ;; 余数放到 cx里
	mov dx,[di] ;; 高位商 移到 dx中
	add ax,[di].2 ;; 低位商加到 ax中
	
	ret

;; ax 为 原本的值
;; cx 为 除数
;; 返回值 (AX)+(DX)
divhigh:
	mov bx,dx
	mov ax,bx
	and bx,0000FH ;; 拿到个位数
	and ax,0FFF0H ;; 去除个位数

	mov dx,0
	div cx ;; 不存在余数，因为FFF0
	push ax ;; 把FFF0/CX商保存

	mov ax,bx
	mov bx,10H
	mul bx ;; 在除之前要把BX乘10H,得到F0
	mov dx,0
	div cx ;; 不存在余数，因为为F0
	
	mov bx,10H ;; 这为了计算正确，F0/A != F/A
	div bx
	;; 现在 ax中就是 商，dx就是余数
	;; 把把 ax加到之前的(FFF0/CX)商中
	pop bx;; 拿到 FFF0/CX的值
	add ax,bx ;; 现在这里的就是其高位的值
	push ax ;; 保存ax

	mov ax,dx ;; dx放到 ax中做乘法运算
	mov bx,1000H
	mul bx
	mov dx,ax ;; 把乘法的值还到 dx中
	pop ax ;; 拿加ax

	;; AX=1999, DX=8000 实际结果是19998000
	ret 


code ends
end start

```

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230401220714901-1380957578.png)

https://blog.csdn.net/weixin_43569916/article/details/104866904
看了这个后，我麻了。我花了三个小时写的东西，人家一下就写出来了。
我主要是没想通，DX没除完，还剩的 一个值，居然可以放到下一个值的前面。照样可以继续算。
所以我思路 有 误，我用另一种 思路实现了。
```
assume cs:code

code segment

start:
	mov ax,424CH
	mov dx,0FFFFH
	mov cx,0AH

	call divdw

	mov ax,4c00h
	int 21h

divdw:
	;; 先做高位除法
	push ax
	mov ax,dx
	mov dx,0
	div cx
	mov bx,ax
	;; 计算低位
	pop ax
	div cx
	mov cx,dx ;; 先移余数
	mov dx,bx ;; bx是高位的商
	ret

code ends

end start


```
![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230401223648984-1880329058.png)
