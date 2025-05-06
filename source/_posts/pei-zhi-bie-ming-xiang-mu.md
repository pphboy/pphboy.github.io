---
title: Vite 配置别名   vue3 项目
date: 2022-01-25 12:07:00
---

官方文档还是有点难懂，然后点链接找到了 https://github.com/rollup/plugins/tree/master/packages/alias#entries

```js
// rollup.config.js
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';

const customResolver = resolve({
  extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss']
});
const projectRootDir = path.resolve(__dirname);

export default {
  // ...
  plugins: [
    alias({
      entries: [
        {
          find: 'src',
          replacement: path.resolve(projectRootDir, 'src')
          // OR place `customResolver` here. See explanation below.
        }
      ],
      customResolver
    }),
    resolve()
  ]
};
```

### 我的写法
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias'
import path from 'path'

const projectRootDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		alias({
			entries:[
				{find: '@',replacement: path.resolve(projectRootDir, 'src')}
			],
		})
	],
})


```
### 官方文档
【地址】https://vitejs.dev/config/#publicdir
![image](https://img2022.cnblogs.com/blog/2146100/202201/2146100-20220125120417130-1364708757.png)
