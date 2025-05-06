---
title: 王爽汇编 课程设计1
date: 2023-04-05 15:05:00
---


### 代码部分
**任务： 将实验7中的Power idea公司的数据按照下图显示出来**
![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230405150105934-187088277.png)

用时3天。

代码行为240行左右。

小结：
* 在一个模块中，使用了全局的四个寄存器,ax,bx,cx,dx 务必要 使用成对的push-pop相等恢复，不然出现的出错在代码量大了后很难发现

如下：是进行一个 si 寄存器值的除2，因为在写代码的时候是需要用到，但因为没有恢复 dx，导致在写的时候，在高位值多了个1，就算不对了。


```
push ax
push dx

mov ax,si
mov dx,0
mov cx,10
div cx

pop ax
pop dx
```

你可以这样写，这样写的代码会更清晰明了。

```
pusha:
	push ax
	push bx
	push cx
	push dx
	ret

popa:
	pop ax
	pop bx
	pop cx
	pop dx
	ret

call pusha

mov ax,si
mov dx,0
mov cx,10
div cx

call popa

```

![image](https://img2023.cnblogs.com/blog/2146100/202304/2146100-20230405145523187-890222052.png)


```
assume cs:code,ds:data,ss:stack

data segment
    db '1975','1976','1977','1978','1979','1980','1981','1982','1983'
    db '1984','1985','1986','1987','1988','1989','1990','1991','1992'
    db '1993','1994','1995'
    ;表示21年的21个字符串（4字节）
    dd 16,22,382,1356,2390,8000,16000,24486,50065,97479,140417,197514
    dd 345980,590827,803530,1183000,1843000,2759000,3753000,4649000,5937000
    ;表示21年公司总收入的21个dword型数据（4字节）
    dw 3,7,9,13,28,38,130,220,476,778,1001,1442,2258,2793,4037,5635,8226
    dw 11542,11430,15257,17800
    ;表示21年公司雇员人数的21个word型数据（2字节）
data ends

d segment
	dd 64 dup(0)
d ends

stack segment
    dd 64 dup(0)
stack ends

code segment
start:
    mov ax,data
    mov ds,ax
    ;mov ax,d
    mov ax,0B800H;
    mov es,ax
    mov ax,stack
    mov ss,ax
    mov sp,128

    mov cx,21
	mov dx,0
    sm:
        call show_line
        inc dh
        loop sm


    mov ax,4c00h
    int 21h

;; dh 行 dl 列
show_line:
    push cx
    push ax
    push dx

    mov ax,stack
    mov ss,ax
    mov si,0 ;; 数据的索引
    mov di,0 ;; 临时变量
    mov ax,0

    ;; 要多出来一行
    mov al,160
    mov ah,1
    mul ah
    mov bx,ax
    
    mov ax,160
    mul dh
    add ax,bx
    mov di,ax ;; 计算 di ,就是数据的行的起始位置

    ;; 计算位置, 就是数据的行数
    mov al,dh   
    mov bh,4
    mul bh

    ;; 计算好数据的位置后，拿到偏移地址
    mov si,ax


;; 加上 列号

	push si
    mov cx,4
    sstr:
        mov al,[si]
        mov byte ptr es:[di],al
        mov byte ptr es:[di+1],01000010B
        inc si
        add di,2
        loop sstr
	;; 64
	pop si 

    ;; 添加6 个空格
    mov cx,6
    call add_space

    ;; 最后 bx 剩的数字 ，就是需要在后面添加 空格的个数

	;; 放大数字
    mov ax,[si+84] ;; 低位放 ax
    mov dx,[si+84].2 ;; 高位放 dx

    mov bx,10
    call add_number
    ;; 在拿 后面的人数的时候，应当是 要以前的位置除以2

    push si
    mov ax,si
    mov bx,2
    div bx
	;;

	;; 7f
    mov si,ax

	;;  放人数
    mov ax,[si+84+84] ;; 低位放 ax
    pop si
    mov dx,0
    mov bx,10
	;; 8c
    call add_number
	;; 8f

	;; 需要添加平均数 ，总收入除以总人数
	;; 添加总金额
    mov ax,[si+84] ;; 低位放 ax
    mov dx,[si+84].2 ;; 高位放 dx

    push si
	push ax
	push dx

	;; 32 位除法
	mov dx,0 ;; dx 要归0
    mov ax,si
    mov bx,2
    div bx

	; 9e
    mov si,ax

	;;  放人数
	mov cx,[si+84+84] ;; 这里是平均数

	pop dx
	pop ax
    pop si

	;; 添加平均数
	call divdh

	;; 计算完后，商放在ax和dx中，余数在cx中
	;; 都不用赋值，可以直接放到屏幕上
	call add_number

	add si,4 ;; si 的 步长 为 4

    pop dx
    pop ax
    pop cx
    ret

;; ax 低位
;; dx 高位
;; bx 长度
;; di 表示显示的起始位置
add_number:
	;; 除到 ax=0，然后再取cx的值加进进去
	mov bx,0
    s_total:
		mov cx,0AH
		call divdh
		inc bx
		push cx

		mov cx,ax
		jcxz ex

		mov cx,0AH
		loop s_total
	
	ex:
		mov cx,bx

		jmp addo
	addo:
		pop ax
		add al,30H
		mov byte ptr es:[di],al
        mov byte ptr es:[di+1],01000010B
		
		add di,2
		loop addo
	
	mov cx,0AH
	sub cx,bx

	call add_space
	ret

clear:
    mov ax,0
    mov bx,0
    mov dx,0
    ret

;; cx 为 添加空格的数量
;; di 为 空格起始显示地址
add_space:
    sad:
        mov byte ptr es:[di],20H
        mov byte ptr es:[di].1,11000010B
        add di,2
        loop sad
    ret

;; ax  低16位
;; dx 高16位
;; cx 除数
divdh:
    push bx
    push ax
    mov ax,dx
    mov dx,0
    div cx

    mov bx,ax ;; 保存结果

    pop ax

    div cx
    mov cx,dx
    mov dx,bx

    pop bx
    ret


code ends

end start
```


### 总结

挑战自己，就是要在这种难度中，从未知中探索，不断提升。在写实验时，一定不能去抄网上的代码，一定要自己写。因为如此，才能得到自己的层次上的进步，学习方法的进步，技术的进步。