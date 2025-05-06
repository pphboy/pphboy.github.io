---
title: vscode 开发 vue3项目 ， src 别名 为 @ ，报错
date: 2023-04-08 22:57:00
---

https://geekdaxue.co/read/me-note@vue/mydm8l

需要设置 basicURL
然后就生效了

```json
{
  "compilerOptions": {
    // 设置解析非相对模块名称的基本目录
    "baseUrl": ".",
    // 设置模块名到基于baseUrl的路径映射，可以设置路径别名的语法提示
    "paths": {
            "@/*": ["src/*"],
            "~/*": ["src/assets/*"],
            "#/*": ["src/scripts/*"]
    },
  },
}
```