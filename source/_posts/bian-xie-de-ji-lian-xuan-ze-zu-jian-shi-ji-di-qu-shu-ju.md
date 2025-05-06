---
title: 编写antd的Cascader 级联选择组件市级地区数据
date: 2021-01-24 12:43:00
---


下面是该组件的使用数据的格式
```
options: [
 {
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [
    {
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [
        {
          value: 'xihu',
          label: 'West Lake',
        },
      ],
    },
  ],
},
],
```

https://github.com/airyland/china-area-data
数据来源于 此项目的v5版本

下面是文件的地址,city.json文件是对应此组件的
https://gitee.com/pphboy/citys
