---
title: 8086汇编，大小写转换
date: 2023-03-06 11:04:00
---



```asm
    assume cs:code,ds:data

    data segment
    db 'BaSic'
    db 'INFORMaTION'
    
    data ends


    code segment

start:
    mov ax,data
    mov ds,ax

    mov bx,0
    mov cx,5    
s:  mov al,[bx]
    and al,01001111b
    mov [bx],al
    
    inc bx                      ; bx+1
    
    loop s

    mov cx,11
s0:
    mov al,[bx]
    or al,01100000b
    mov [bx],al
    inc bx
    loop s0

    mov ax,4c00h
    int 21h

    code ends

    end start


```