---
title: Vue Typescript 引入文件接口，就无法使用withDefaults
date: 2023-04-22 22:11:00
---


就是代码写的不规范

报错写法
```
	import {Setting} from '@element-plus/icons-vue'
	import { defineProps ,withDefaults } from 'vue'
	import {PiProject} from '@/types/Project'
	interface ProjectCardProps{
		project:PiProject
	}
	const props = defineProps<ProjectCardProps>();

	withDefaults(props,{
		project:{}
	} )
```

返回值得是一个函数

正确写法
```
	import {Setting} from '@element-plus/icons-vue'
	import { defineProps ,withDefaults } from 'vue'
	import {PiProject} from '@/types/Project'
	interface ProjectCardProps{
		project:PiProject
	}
	const props = defineProps<ProjectCardProps>();
	withDefaults(props,{
		project:():PiProject=>({

		} as PiProject)
	} )
```