---
title: Qt 设置窗口到顶，且不允许其他窗口操作
date: 2023-02-16 12:28:00
---


```cpp
aboutWindows->setWindowFlags(windowFlags() | Qt::CustomizeWindowHint | Qt::WindowStaysOnTopHint);
aboutWindows->setWindowModality(Qt::ApplicationModal);

```