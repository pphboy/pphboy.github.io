---
title: Ctrl+Space输入法切换状态解决方法
date: 2023-06-12 11:42:00
---



```
Windows Registry Editor Version 5.00

[HKEY_USERS\.DEFAULT\Control Panel\Input Method\Hot Keys\00000010]
"Key Modifiers"=hex:00,c0,00,00
"Target IME"=hex:00,00,00,00
"Virtual Key"=hex:ff,00,00,00


[HKEY_USERS\.DEFAULT\Control Panel\Input Method\Hot Keys\00000070]
"Key Modifiers"=hex:00,c0,00,00
"Target IME"=hex:00,00,00,00
"Virtual Key"=hex:ff,00,00,00


[HKEY_CURRENT_USER\Control Panel\Input Method\Hot Keys\00000010]
"Key Modifiers"=hex:02,c0,00,00
"Target IME"=hex:00,00,00,00
"Virtual Key"=hex:22,00,00,00


[HKEY_CURRENT_USER\Control Panel\Input Method\Hot Keys\00000070]
"Key Modifiers"=hex:02,c0,00,00
"Target IME"=hex:00,00,00,00
"Virtual Key"=hex:21,00,00,00



```