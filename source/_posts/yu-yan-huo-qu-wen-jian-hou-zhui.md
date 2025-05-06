---
title: C语言获取文件后缀
date: 2023-07-10 08:51:00
---

在操作文件的时候，或者处理 http 请求时，可能需要处理文件的类型

这里我的需求是获取文件后缀

使用的方法是 strrchr

```
/* 
   char *strrchr(const char *s, int c);
   The strrchr() function returns a pointer to the last  occurrence  of
   the character c in the string s.

 */
char* get_postfix_from_path(char *path) {
  return strrchr(path, '.');
}

```