---
title: QT 5 中文乱码，试试在PRO文件加入这几行代码
date: 2022-07-29 23:20:00
---

```pro
msvc{
        QMAKE_CFLAGS += /utf-8
        QMAKE_CXXFLAGS += /utf-8
}
```